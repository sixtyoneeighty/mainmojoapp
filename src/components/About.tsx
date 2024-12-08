import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">About Dr. Mojo</h1>
        
        <div className="space-y-8">
          <section className="bg-gray-800/50 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">The Power of LLM Vision Technology</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Dr. Mojo leverages advanced Large Language Model (LLM) vision technology to analyze medical images 
              with unprecedented accuracy. Unlike traditional image processing systems, LLM vision combines the power 
              of visual understanding with deep contextual knowledge from medical literature and training data.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              This technology works by breaking down medical images into detailed features while simultaneously 
              understanding the broader medical context. The system can identify subtle patterns, anomalies, and 
              correlations that might be challenging to spot with the human eye alone. By processing both visual 
              data and medical knowledge simultaneously, it can provide more comprehensive and context-aware analyses.
            </p>
          </section>

          <section className="bg-gray-800/50 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Why It's Effective</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              The effectiveness of our system stems from its ability to learn from vast amounts of medical imaging 
              data while maintaining consistency and accuracy. Unlike traditional computer vision systems, LLM vision 
              technology can understand and explain its observations in natural language, making its insights more 
              accessible and actionable for healthcare professionals.
            </p>
            <p className="text-gray-300 leading-relaxed">
              The system continuously improves through exposure to new cases while maintaining strict privacy and 
              security standards. This combination of advanced AI technology with practical medical application 
              makes it an invaluable tool for supporting diagnostic processes.
            </p>
          </section>

          <section className="bg-gray-800/50 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">About the Developers</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Dr. Mojo is developed by sixtyoneeighty, a team dedicated to advancing healthcare through artificial 
              intelligence. With a portfolio of health-related AI applications at various stages of development, 
              we're committed to creating tools that make a real difference in healthcare delivery and patient 
              outcomes.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Our team combines expertise in artificial intelligence, medical imaging, and healthcare to develop 
              solutions that address real-world medical challenges. Dr. Mojo is just one part of our broader 
              vision to transform healthcare through innovative AI applications.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
