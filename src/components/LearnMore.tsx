import React from 'react';

export default function LearnMore() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Learn More About Dr. Mojo</h1>
        
        <div className="space-y-8">
          <section className="bg-gray-800/50 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Technology Overview</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              This platform harnesses cutting-edge advancements in large language models (LLMs) and AI vision technologies 
              to provide powerful support for medical image analysis. By assisting healthcare professionals in analyzing 
              medical images, LLMs contribute to faster diagnoses, potentially leading to earlier interventions and 
              improved patient outcomes. These tools have demonstrated exceptional capabilities, including identifying 
              subtle patterns and abnormalities that might be missed in traditional readings.
            </p>
          </section>

          <section className="bg-gray-800/50 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Our AI system acts as a "second set of eyes," offering rapid, preliminary insights to support clinical 
              decisions. However, all findings must be reviewed and validated by qualified medical professionals. 
              The system's output is meant to serve as an aid in the diagnostic process, not as a standalone source 
              of medical advice or definitive diagnosis.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Studies have shown that AI-assisted radiology can help improve efficiency, reduce reading times, and 
              flag subtle abnormalities that might otherwise go unnoticed. Even so, the responsibility for final 
              interpretation and diagnosis lies with trained professionals, who can integrate AI insights with the 
              patient's complete clinical context and history to make informed decisions.
            </p>
          </section>

          <section className="bg-gray-800/50 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Further Reading</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium mb-2">The Role of Large Language Models in Medical Image Processing</h3>
                <p className="text-gray-300 mb-2">
                  A comprehensive review providing a detailed overview of how LLMs are being applied in medical imaging, 
                  including their strengths, limitations, and future potential.
                </p>
                <a 
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10784029/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Read the full article →
                </a>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2">Chatbots and Large Language Models in Radiology</h3>
                <p className="text-gray-300 mb-2">
                  This article focuses specifically on the use of LLMs in radiology, offering practical insights into 
                  their applications and implications for clinical practice and research.
                </p>
                <a 
                  href="https://pubs.rsna.org/doi/full/10.1148/radiol.232756"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Read the full article →
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
