import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Results from './Results';
import { AnalysisResponse } from '../../services/openai';

export default function ResultsContainer() {
  const [results, setResults] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      console.log('ResultsContainer mounted, retrieving results...');
      
      const storedResults = sessionStorage.getItem('analysisResults');
      console.log('Raw stored results:', storedResults);
      
      if (!storedResults) {
        console.log('No results found in sessionStorage');
        navigate('/upload');
        return;
      }

      try {
        const parsedResults = JSON.parse(storedResults) as AnalysisResponse;
        console.log('Successfully parsed results:', parsedResults);
        
        // Check if we have at least some content
        if (!parsedResults.diagnosis && !parsedResults.explanation && !parsedResults.recommendations) {
          console.error('Results appear empty:', parsedResults);
          throw new Error('Analysis results appear to be empty');
        }

        setResults(parsedResults);
        setIsLoading(false);
      } catch (parseError) {
        console.error('Error parsing results:', parseError);
        setError('Failed to parse analysis results. Please try again.');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Error in ResultsContainer:', err);
      setError('Failed to load analysis results. Please try again.');
      setIsLoading(false);
    }
  }, [navigate]);

  return (
    <Results
      results={results}
      isLoading={isLoading}
      error={error}
    />
  );
}
