import OpenAI from 'openai';
import { generateAnalysisPrompt } from './prompts';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, API calls should be made from backend
});

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
  console.log('Raw OpenAI response:', content);
  
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
      const trimmedSection = section.trim();
      
      if (trimmedSection.startsWith('TECHNICAL ASSESSMENT:')) {
        result.technique = trimmedSection
          .replace('TECHNICAL ASSESSMENT:', '')
          .trim();
      } 
      else if (trimmedSection.startsWith('CLINICAL FINDINGS:')) {
        result.diagnosis = trimmedSection
          .replace('CLINICAL FINDINGS:', '')
          .trim()
          .replace(/\*\s/g, '• '); // Replace asterisk + space with bullet point
      }
      else if (trimmedSection.startsWith('PATIENT SUMMARY:')) {
        result.explanation = trimmedSection
          .replace('PATIENT SUMMARY:', '')
          .trim();
      }
      else if (trimmedSection.startsWith('RECOMMENDATIONS:')) {
        result.recommendations = trimmedSection
          .replace('RECOMMENDATIONS:', '')
          .trim()
          .replace(/\*\s/g, '• '); // Replace asterisk + space with bullet point
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
    console.log('Sending prompt to OpenAI:', prompt);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: {
                url: request.imageBase64,
                detail: "high"
              }
            }
          ],
        },
      ],
      max_tokens: 1000,
      temperature: 0.5
    });

    console.log('OpenAI raw response:', JSON.stringify(response, null, 2));
    const content = response.choices[0]?.message?.content;
    
    if (!content) {
      console.error('No content in OpenAI response:', response);
      throw new Error('No response content from OpenAI');
    }

    return parseAnalysisResponse(content);
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
}
