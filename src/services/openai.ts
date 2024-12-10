import { generateAnalysisPrompt } from './prompts';

// Replace with Gemini API key
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Replace with Gemini API endpoint
const GEMINI_API_ENDPOINT="https://generativelanguage.googleapis.com"

/**
 * This file needs to be updated to use the Gemini API instead of OpenAI.
 * 
 * 1. Replace `GEMINI_API_ENDPOINT` with the correct Gemini API endpoint.
 * 2. Update the request body structure to match the Gemini API requirements.
 * 3. Adjust error handling and response parsing as needed for Gemini.
 */

export interface AnalysisRequest {
  imageType: string;
  bodyArea: string;
  comments: string;
  imageBase64: string;
}

export interface AnalysisResponse {
  technique: string;
  diagnosis: string;
  explanation: string;
  recommendations: string;
}

function parseAnalysisResponse(content: string): AnalysisResponse {
  console.log('Raw Gemini response:', content);
  
  // Initialize result object
  const result: AnalysisResponse = {
    technique: '',
    diagnosis: '',
    explanation: '',
    recommendations: ''
  };

  try {
    // Split content by section headers, keeping the headers
    const sections = content.split(/(?=TECHNICAL ASSESSMENT:|CLINICAL FINDINGS:|PATIENT SUMMARY:|RECOMMENDATIONS:)/g);
    console.log('Split sections:', sections);

    sections.forEach(section => {
      const trimmedSection = section.trim()
        .replace(/\*\*/g, '') // Remove double asterisks
        .replace(/\*•\s•/g, '•') // Fix double bullet points
        .replace(/\*•/g, '•'); // Fix single bullet points with asterisk
      
      if (trimmedSection.startsWith('TECHNICAL ASSESSMENT:')) {
        result.technique = trimmedSection
          .replace('TECHNICAL ASSESSMENT:', '')
          .trim();
      } 
      else if (trimmedSection.startsWith('CLINICAL FINDINGS:')) {
        result.diagnosis = trimmedSection
          .replace('CLINICAL FINDINGS:', '')
          .trim();
      }
      else if (trimmedSection.startsWith('PATIENT SUMMARY:')) {
        result.explanation = trimmedSection
          .replace('PATIENT SUMMARY:', '')
          .trim();
      }
      else if (trimmedSection.startsWith('RECOMMENDATIONS:')) {
        result.recommendations = trimmedSection
          .replace('RECOMMENDATIONS:', '')
          .trim();
      }
    });

    // Validate that we have content
    if (!result.diagnosis && !result.explanation && !result.recommendations) {
      console.error('Failed to parse any content from response');
      console.log('Sections found:', sections.map(s => s.substring(0, 50) + '...'));
      throw new Error('No content parsed from response');
    }

    console.log('Parsed result:', result);
    return result;
  } catch (error) {
    console.error('Error parsing analysis response:', error);
    console.log('Content that failed to parse:', content);
    throw error;
  }
}

export async function analyzeImage(request: AnalysisRequest): Promise<AnalysisResponse> {
  try {
    const prompt = generateAnalysisPrompt(request.imageType, request.bodyArea, request.comments);
    console.log('Sending prompt to Gemini:', prompt);

    // Replace with Gemini API request
    const response = await fetch(GEMINI_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GEMINI_API_KEY}`
      },
      body: JSON.stringify({ 
        // Update with Gemini request body format
        prompt: prompt, 
        image: request.imageBase64 
      })
    });

    console.log('Gemini raw response:', JSON.stringify(response, null, 2));
    const content = await response.text(); // Assuming Gemini returns plain text
    
    // Update response parsing logic if needed for Gemini

    return parseAnalysisResponse(content);
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
}
