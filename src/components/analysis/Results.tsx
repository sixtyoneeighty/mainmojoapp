import React from 'react';
import { useNavigate } from 'react-router-dom';

const Results = () => {
  const navigate = useNavigate();
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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Report Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center">
              <img src="/images/dr-mojo-logo.png" alt="Dr. Mojo Logo" className="w-24 h-24 mr-4" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dr. Mojo Medical Imaging</h1>
                <p className="text-gray-600">Advanced AI-Powered Diagnostic Analysis</p>
                <p className="text-gray-500">Report Generated: {currentDate}</p>
              </div>
            </div>
            <img src="/images/medical-letterhead.png" alt="Letterhead" className="h-24" />
          </div>

          {/* Report Content */}
          <div className="space-y-6 text-gray-800">
            {/* Key Findings */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Key Findings</h2>
              <div className="text-gray-700 whitespace-pre-line">{results.diagnosis}</div>
            </div>

            {/* What This Means */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">What This Means</h2>
              <div className="text-gray-700 whitespace-pre-line">{results.explanation}</div>
            </div>

            {/* Next Steps */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Next Steps</h2>
              <div className="text-gray-700 whitespace-pre-line">{results.recommendations}</div>
            </div>

            {/* Technical Details (Collapsible) */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <details>
                <summary className="text-lg font-semibold text-gray-700 cursor-pointer">
                  Technical Assessment Details
                </summary>
                <div className="mt-2 text-gray-600 whitespace-pre-line">
                  {results.technique}
                </div>
              </details>
            </div>

            {/* Signature Section */}
            <div className="mt-12 pt-6 border-t border-gray-200">
              <p className="text-gray-700 mb-2">Analyzed by:</p>
              <img src="/images/dr-mojo-signature.png" alt="Dr. Mojo Signature" className="h-16 mb-1" />
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
