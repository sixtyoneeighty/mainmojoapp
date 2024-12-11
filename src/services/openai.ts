import { generateAnalysisPrompt } from './prompts';

// Replace with OpenAI API key
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// Replace with OpenAI API endpoint
const OPENAI_API_ENDPOINT = "https://api.openai.com/v1/chat/completions"

/**
 * This file needs to be updated to use the OpenAI API instead of Gemini.
 * 
 * 1. Replace `OPENAI_API_ENDPOINT` with the correct OpenAI API endpoint.
 * 2. Update the request body structure to match the OpenAI API requirements.
 * 3. Adjust error handling and response parsing as needed for OpenAI.
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
  console.log('Raw GPT response:', content);
  
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
    console.log('Sending prompt to GPT-4:', prompt);

    const response = await fetch(OPENAI_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: prompt
              },
              {
                type: "image_url",
                image_url: {
                  url: request.imageBase64
                }
              }
            ]
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    return parseAnalysisResponse(content);
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
}
