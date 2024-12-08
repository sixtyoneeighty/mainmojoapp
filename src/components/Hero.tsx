import React from 'react';
import { Brain, Clock, Lock, Sparkles } from 'lucide-react';
import Logo from './Logo';

export default function Hero() {
  return (
    <div className="min-h-screen bg-[#0f1629] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <Logo size="large" />
          </div>
          <p className="text-xl text-gray-400 mb-4 max-w-3xl mx-auto">
            Get detailed analysis of your medical images instantly, without the waiting
            rooms and copays.
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors">
              Get Started
            </button>
            <button className="bg-gray-800 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-700 transition-colors">
              Learn More
            </button>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose Dr. Mojo?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Clock className="w-8 h-8 text-blue-500" />}
              title="Instant Analysis"
              description="Get results within minutes, not days or weeks"
            />
            <FeatureCard
              icon={<Brain className="w-8 h-8 text-blue-500" />}
              title="AI-Powered"
              description="Advanced machine learning algorithms for accurate diagnostics"
            />
            <FeatureCard
              icon={<Lock className="w-8 h-8 text-blue-500" />}
              title="Secure & Private"
              description="Your medical data is encrypted and protected"
            />
            <FeatureCard
              icon={<Sparkles className="w-8 h-8 text-blue-500" />}
              title="Clear Results"
              description="Easy to understand reports with detailed explanations"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-center mb-2">{title}</h3>
      <p className="text-gray-400 text-center">{description}</p>
    </div>
  );
}