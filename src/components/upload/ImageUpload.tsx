import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeImage } from '../../services/openai';

const ImageUpload = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [imageType, setImageType] = useState('X-Ray');
  const [bodyArea, setBodyArea] = useState('');
  const [comments, setComments] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    if (file.type.startsWith('image/')) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError(null);
    } else {
      setError('Please upload an image file');
    }
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
        
        try {
          const results = await analyzeImage({
            imageType,
            bodyArea,
            comments,
            imageBase64: base64String
          });
          
          // Store results in session storage
          sessionStorage.setItem('analysisResults', JSON.stringify(results));
          
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
    <div className="min-h-screen bg-[#0f1629] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#1a2137] rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Upload Medical Image</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload Area */}
            <div 
              className={`relative border-2 border-dashed rounded-lg p-4 ${
                dragActive ? 'border-indigo-500 bg-indigo-50/5' : 'border-gray-600 hover:border-indigo-500'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <div className="text-center">
                {preview ? (
                  <div className="mt-2">
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="mx-auto max-h-48 rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="text-gray-400">
                    <svg 
                      className="mx-auto h-10 w-10 text-gray-500" 
                      stroke="currentColor" 
                      fill="none" 
                      viewBox="0 0 48 48" 
                      aria-hidden="true"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
                      />
                    </svg>
                    <p className="mt-1 text-sm">Drag and drop an image, or click to select</p>
                  </div>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="imageType" className="block text-sm font-medium text-gray-300">
                  Image Type*
                </label>
                <select
                  id="imageType"
                  value={imageType}
                  onChange={(e) => setImageType(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-600 bg-[#2d3748] text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="X-Ray">X-Ray</option>
                  <option value="MRI">MRI</option>
                </select>
              </div>

              <div>
                <label htmlFor="bodyArea" className="block text-sm font-medium text-gray-300">
                  Body Area*
                </label>
                <select
                  id="bodyArea"
                  value={bodyArea}
                  onChange={(e) => setBodyArea(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-600 bg-[#2d3748] text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Select Area</option>
                  <option value="Head">Head</option>
                  <option value="Chest">Chest</option>
                  <option value="Abdomen">Abdomen</option>
                  <option value="Spine">Spine</option>
                  <option value="Extremities">Extremities</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="comments" className="block text-sm font-medium text-gray-300">
                Additional Comments
              </label>
              <textarea
                id="comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={3}
                placeholder="Any specific concerns or symptoms..."
                className="mt-1 block w-full rounded-md border-gray-600 bg-[#2d3748] text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading || !image}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white 
                  ${loading || !image 
                    ? 'bg-indigo-500 opacity-50 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  'Analyze Image'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
