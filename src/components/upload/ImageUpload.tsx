import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeImage } from '../../services/openai';

const ImageUpload = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [imageType, setImageType] = useState<string>('X-Ray');
  const [bodyArea, setBodyArea] = useState<string>('');
  const [comments, setComments] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bodyAreaOptions = {
    'X-Ray': [
      { value: 'Chest', label: 'Chest' },
      { value: 'Spine', label: 'Spine' },
      { value: 'Skull', label: 'Skull' },
      { value: 'Shoulder', label: 'Shoulder' },
      { value: 'Hand/Wrist', label: 'Hand/Wrist' },
      { value: 'Hip', label: 'Hip' },
      { value: 'Knee', label: 'Knee' },
      { value: 'Foot/Ankle', label: 'Foot/Ankle' }
    ],
    'MRI': [
      { value: 'Brain', label: 'Brain' },
      { value: 'Spine (Cervical)', label: 'Spine (Cervical)' },
      { value: 'Spine (Thoracic)', label: 'Spine (Thoracic)' },
      { value: 'Spine (Lumbar)', label: 'Spine (Lumbar)' },
      { value: 'Shoulder', label: 'Shoulder' },
      { value: 'Knee', label: 'Knee' },
      { value: 'Hip', label: 'Hip' },
      { value: 'Abdomen', label: 'Abdomen' },
      { value: 'Pelvis', label: 'Pelvis' }
    ],
    'CT Scan': [
      { value: 'Head', label: 'Head' },
      { value: 'Chest', label: 'Chest' },
      { value: 'Abdomen', label: 'Abdomen' },
      { value: 'Pelvis', label: 'Pelvis' },
      { value: 'Spine', label: 'Spine' }
    ],
    'Ultrasound': [
      { value: 'Abdomen', label: 'Abdomen' },
      { value: 'Pelvis', label: 'Pelvis' },
      { value: 'Thyroid', label: 'Thyroid' },
      { value: 'Breast', label: 'Breast' },
      { value: 'Vascular', label: 'Vascular' }
    ]
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    // Only accept png, jpeg, gif, or webp files
    const allowedTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.type)) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError(null);
    } else {
      setError('Please upload a PNG, JPEG, GIF, or WebP image file');
    }
  };

  const handleImageTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    setImageType(newType);
    setBodyArea(''); // Reset body area when image type changes
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image || !imageType || !bodyArea) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        console.log('Image loaded, first 100 chars:', base64String.substring(0, 100));
        
        try {
          const results = await analyzeImage({
            imageType,
            bodyArea,
            comments,
            imageBase64: base64String
          });
          
          // Store results and image data in session storage
          sessionStorage.setItem('analysisResults', JSON.stringify(results));
          sessionStorage.setItem('uploadedImage', base64String);
          sessionStorage.setItem('imageType', imageType);
          sessionStorage.setItem('bodyArea', bodyArea);
          
          console.log('Stored in session storage:', {
            imageType,
            bodyArea,
            imageLength: base64String.length,
            resultsStored: !!sessionStorage.getItem('analysisResults'),
            imageStored: !!sessionStorage.getItem('uploadedImage')
          });
          
          // Navigate to results page
          navigate('/results');
        } catch (error) {
          console.error('Error during analysis:', error);
          setError('An error occurred during analysis. Please try again.');
          setLoading(false);
        }
      };
      reader.readAsDataURL(image);
    } catch (error) {
      console.error('Error reading file:', error);
      setError('Error reading file. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1629] py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <div className="bg-[#1a2137] rounded-lg shadow-xl p-8">
          <h2 className="text-xl font-semibold text-white text-center mb-1">Upload Medical Image</h2>
          <p className="text-gray-400 text-center text-sm mb-6">Upload your medical image for AI-powered analysis</p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Image Upload Area */}
            <div 
              className={`relative border border-dashed rounded-lg p-8 ${
                dragActive ? 'border-blue-500 bg-blue-50 bg-opacity-10' : 'border-gray-500'
              } transition-colors duration-200 ease-in-out`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => e.target.files && handleFile(e.target.files[0])}
                accept="image/*"
              />
              
              <div className="text-center">
                {preview ? (
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="mx-auto max-h-36 rounded-lg mb-2"
                  />
                ) : (
                  <div className="text-center py-4">
                    <svg className="mx-auto h-8 w-8 text-gray-400 mb-2" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                      <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-gray-400 text-sm">
                      Drag and drop your image here, or <span className="text-blue-400">click to browse</span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Image Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Image Type
                </label>
                <select
                  value={imageType}
                  onChange={handleImageTypeChange}
                  className="w-full px-3 py-2 bg-[#1e2638] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="X-Ray">X-Ray</option>
                  <option value="MRI">MRI</option>
                  <option value="CT Scan">CT Scan</option>
                  <option value="Ultrasound">Ultrasound</option>
                </select>
              </div>

              {/* Body Area */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Body Area
                </label>
                <select
                  value={bodyArea}
                  onChange={(e) => setBodyArea(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1e2638] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select Area</option>
                  {bodyAreaOptions[imageType as keyof typeof bodyAreaOptions].map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Additional Comments */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Additional Comments (Optional)
              </label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={3}
                placeholder="Any specific concerns or symptoms..."
                className="w-full px-3 py-2 bg-[#1e2638] border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm mt-2">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {loading ? 'Analyzing...' : 'Analyze Image'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
