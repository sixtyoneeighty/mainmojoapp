import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useSupabase } from '../../contexts/SupabaseContext';

const CreateProfile = () => {
  const navigate = useNavigate();
  const { user } = useSupabase();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: ''
  });

  useEffect(() => {
    // Check if profile already exists
    const checkProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (data) {
          // Profile exists, redirect to upload page
          navigate('/upload');
        }
      }
    };

    checkProfile();
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('profiles')
        .insert([
          {
            id: user.id,
            name: formData.name,
            age: parseInt(formData.age),
            gender: formData.gender
          }
        ]);

      if (error) throw error;

      navigate('/upload');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-[#0f1629] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-[#1a2137] p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Create Your Profile
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Please provide your basic information
          </p>
        </div>
        {error && (
          <div className="bg-red-500 text-white p-3 rounded-md text-sm">
            {error}
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 bg-[#2d3748] placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-300">
                Age
              </label>
              <input
                id="age"
                name="age"
                type="number"
                required
                min="0"
                max="120"
                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 bg-[#2d3748] placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-300">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                required
                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 bg-[#2d3748] placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                loading 
                  ? 'bg-indigo-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              }`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Profile...
                </span>
              ) : (
                'Create Profile'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;
