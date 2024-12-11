import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

const Results = () => {
  const navigate = useNavigate();
  const [imageData, setImageData] = useState<string | null>(null);
  const [imageType, setImageType] = useState<string | null>(null);
  const [bodyArea, setBodyArea] = useState<string | null>(null);
  
  useEffect(() => {
    // Load data from session storage
    const storedImage = sessionStorage.getItem('uploadedImage');
    const storedType = sessionStorage.getItem('imageType');
    const storedArea = sessionStorage.getItem('bodyArea');
    
    console.log('Loading from session storage:', {
      hasImage: !!storedImage,
      imageLength: storedImage?.length,
      type: storedType,
      area: storedArea
    });
    
    setImageData(storedImage);
    setImageType(storedType);
    setBodyArea(storedArea);
  }, []);

  const storedResults = sessionStorage.getItem('analysisResults');
  let results = null;

  try {
    if (storedResults) {
      results = JSON.parse(storedResults);
    }
  } catch (error) {
    console.error('Error parsing results:', error);
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">No Results Available</h2>
            <p className="mb-4 text-gray-600">Please upload an image for analysis first.</p>
            <button
              onClick={() => navigate('/upload')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Go to Upload
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });

  const handleDownloadPDF = () => {
    const element = document.getElementById('report-content');
    const opt = {
      margin: 1,
      filename: 'medical-report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    if (element) {
      html2pdf().set(opt).from(element).save();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Report Header */}
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold text-[#1a2137] mb-2">Dr. Mojo Medical Imaging</h1>
                <p className="text-xl text-gray-600 mb-1">Advanced AI-Powered Diagnostic Analysis</p>
                <p className="text-gray-500">Report Generated: {currentDate}</p>
              </div>
              <div className="flex flex-col items-end space-y-4">
                <img 
                  src="./images/mojo-logo.png" 
                  alt="Dr. Mojo Logo" 
                  className="w-20 h-20"
                  onError={(e) => console.error('Logo load error:', e)}
                />
                <button
                  onClick={handleDownloadPDF}
                  className="inline-flex items-center px-4 py-2 bg-[#1a2137] text-white rounded-md hover:bg-[#2a3147] transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF
                </button>
              </div>
            </div>
            <div className="border-b border-gray-200 mt-6"></div>
          </div>

          {/* Report Content */}
          <div id="report-content" className="space-y-8 text-gray-800">
            {/* Image Analysis */}
            <div>
              <h2 className="text-2xl font-bold text-[#1a2137] mb-4">Analyzed Image</h2>
              <div className="flex items-start space-x-6">
                <div className="w-1/2">
                  {imageData ? (
                    <>
                      <div className="rounded-lg overflow-hidden shadow-md">
                        <img 
                          src={imageData}
                          alt="Analyzed medical image"
                          className="w-full"
                          onError={(e) => console.error('Image load error:', e)}
                        />
                      </div>
                      <div className="mt-3 text-sm text-gray-600">
                        <p>Type: {imageType}</p>
                        <p>Area: {bodyArea}</p>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Image not available</p>
                    </div>
                  )}
                </div>
                <div className="w-1/2">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-xl font-bold text-[#1a2137] mb-3">Key Findings</h3>
                    <div className="text-gray-700 whitespace-pre-line">{results.diagnosis}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* What This Means */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-[#1a2137] mb-3">What This Means</h2>
              <div className="text-gray-700 whitespace-pre-line">{results.explanation}</div>
            </div>

            {/* Next Steps */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-[#1a2137] mb-3">Next Steps</h2>
              <div className="text-gray-700 whitespace-pre-line">{results.recommendations}</div>
            </div>

            {/* Technical Details (Collapsible) */}
            <div className="bg-gray-50 rounded-lg p-6">
              <details>
                <summary className="text-lg font-semibold text-[#1a2137] cursor-pointer">
                  Technical Assessment Details
                </summary>
                <div className="mt-3 text-gray-600 whitespace-pre-line">
                  {results.technique}
                </div>
              </details>
            </div>

            {/* Signature Section */}
            <div className="mt-12 pt-6 border-t border-gray-200">
              <p className="text-gray-700 mb-2">Analyzed by:</p>
              <img 
                src="./images/mojo-signature.png" 
                alt="Digital Signature" 
                className="h-12 mb-2"
                onError={(e) => console.error('Signature load error:', e)}
              />
              <p className="text-gray-900 font-semibold">AI Medical Imaging Specialist</p>
              <p className="text-gray-500">Report ID: {Math.random().toString(36).substr(2, 8).toUpperCase()}</p>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 italic">
                DISCLAIMER: This analysis is provided by an AI system for informational purposes only and does not constitute medical advice. 
                This preliminary interpretation should be reviewed by a qualified healthcare professional. Medical decisions should not be made based solely on this report. 
                Always consult with a licensed healthcare provider for proper medical diagnosis, advice, and treatment.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={() => navigate('/upload')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Analyze Another Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
