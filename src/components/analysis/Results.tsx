import React from 'react';
import { useNavigate } from 'react-router-dom';

const Results = () => {
  const navigate = useNavigate();

  // Mock analysis results - replace with actual data
  const mockResults = {
    findings: [
      {
        area: 'Primary observation',
        description: 'No acute abnormalities detected'
      },
      {
        area: 'Secondary findings',
        description: 'Normal bone density and alignment'
      }
    ],
    confidence: 0.92,
    recommendations: 'Regular follow-up recommended'
  };

  const handleDownloadPDF = () => {
    // TODO: Implement PDF generation and download
    console.log('Downloading PDF...');
  };

  return (
    <div className="min-h-screen bg-[#0f1629] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#1a2137] rounded-lg shadow-xl p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">Analysis Results</h2>
            <div className="flex space-x-4">
              <button
                onClick={handleDownloadPDF}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Download PDF
              </button>
              <button
                onClick={() => navigate('/upload')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Analyze Another Image
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Confidence Score */}
            <div className="bg-[#2d3748] rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">AI Confidence Score</span>
                <span className="text-lg font-semibold text-white">
                  {(mockResults.confidence * 100).toFixed(1)}%
                </span>
              </div>
              <div className="mt-2 bg-gray-700 rounded-full h-2">
                <div
                  className="bg-indigo-500 rounded-full h-2"
                  style={{ width: `${mockResults.confidence * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Findings */}
            <div className="bg-[#2d3748] rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-4">Key Findings</h3>
              <div className="space-y-4">
                {mockResults.findings.map((finding, index) => (
                  <div key={index} className="border-l-2 border-indigo-500 pl-4">
                    <h4 className="text-gray-300 font-medium">{finding.area}</h4>
                    <p className="text-white mt-1">{finding.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-[#2d3748] rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-2">Recommendations</h3>
              <p className="text-gray-300">{mockResults.recommendations}</p>
            </div>

            {/* Disclaimer */}
            <div className="text-sm text-gray-400 mt-6">
              <p>
                Note: This analysis is provided by an AI system and should not be considered as a replacement for professional medical advice. Please consult with a healthcare provider for proper medical diagnosis and treatment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
