-- Create profiles table
CREATE TABLE profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    age INTEGER,
    gender VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    PRIMARY KEY (id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view and edit their own profile
CREATE POLICY "Users can view own profile" 
    ON profiles FOR SELECT 
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
    ON profiles FOR UPDATE 
    USING (auth.uid() = id);

-- Create medical_images table
CREATE TABLE medical_images (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    image_type VARCHAR(50) NOT NULL, -- 'xray', 'mri'
    body_area VARCHAR(50) NOT NULL,  -- 'head', 'chest', etc.
    comments TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE medical_images ENABLE ROW LEVEL SECURITY;

-- Create policies for medical_images
CREATE POLICY "Users can view own images" 
    ON medical_images FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own images" 
    ON medical_images FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Create analysis_results table
CREATE TABLE analysis_results (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    image_id UUID REFERENCES medical_images ON DELETE CASCADE,
    confidence_score DECIMAL(5,4) NOT NULL,
    findings JSONB NOT NULL,
    recommendations TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE analysis_results ENABLE ROW LEVEL SECURITY;

-- Create policies for analysis_results
CREATE POLICY "Users can view own analysis results" 
    ON analysis_results FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM medical_images 
            WHERE medical_images.id = analysis_results.image_id 
            AND medical_images.user_id = auth.uid()
        )
    );

-- Create function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for profiles
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
