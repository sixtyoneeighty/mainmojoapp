import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const ImageUpload = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [imageType, setImageType] = useState('');
  const [bodyArea, setBodyArea] = useState('');
  const [comments, setComments] = useState('');
  const [dragActive, setDragActive] = useState(false);

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
    } else {
      alert('Please upload an image file');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (image && imageType && bodyArea) {
      // TODO: Handle image upload and analysis
      navigate('/processing');
    }
  };

  const isFormValid = image && imageType && bodyArea;

  return (
    <div className="min-h-screen bg-[#0f1629] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#1a2137] rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-8">Upload Medical Image</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload Area */}
            <div 
              className={`border-2 border-dashed rounded-lg p-6 text-center ${
                dragActive ? 'border-indigo-500 bg-indigo-50/5' : 'border-gray-600'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {preview ? (
                <div className="relative">
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="max-h-64 mx-auto rounded"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setPreview('');
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-gray-400 mb-4">
                    Drag and drop your image here, or click to select
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files && handleFile(e.target.files[0])}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
                  >
                    Choose File
                  </label>
                </>
              )}
            </div>

            {/* Dropdowns */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="imageType" className="block text-sm font-medium text-gray-300">
                  Image Type
                </label>
                <select
                  id="imageType"
                  value={imageType}
                  onChange={(e) => setImageType(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-600 bg-[#2d3748] text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="xray">X-ray</option>
                  <option value="mri">MRI</option>
                </select>
              </div>

              <div>
                <label htmlFor="bodyArea" className="block text-sm font-medium text-gray-300">
                  Body Area
                </label>
                <select
                  id="bodyArea"
                  value={bodyArea}
                  onChange={(e) => setBodyArea(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-600 bg-[#2d3748] text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select Area</option>
                  <option value="head">Head</option>
                  <option value="chest">Chest</option>
                  <option value="abdomen">Abdomen</option>
                  <option value="spine">Spine</option>
                  <option value="extremities">Extremities</option>
                </select>
              </div>
            </div>

            {/* Comments */}
            <div>
              <label htmlFor="comments" className="block text-sm font-medium text-gray-300">
                Additional Comments
              </label>
              <textarea
                id="comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-600 bg-[#2d3748] text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Any specific concerns or symptoms..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isFormValid
                  ? 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  : 'bg-gray-600 cursor-not-allowed'
              }`}
            >
              Analyze Image
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
