import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoints
  app.post('/api/match-careers', async (req, res) => {
    try {
      const { interests, strengths, subjects, personality, extra } = req.body;
      
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: 'GEMINI_API_KEY is not configured.' });
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `
        Act as a professional career counselor for secondary school students in Nigeria.
        Based on the following student profile, recommend 3 suitable career paths.

        Student Profile:
        Interests: ${interests.join(', ')}
        Strengths: ${strengths.join(', ')}
        Favorite Subjects: ${subjects.join(', ')}
        Personality Traits: ${personality.join(', ')}
        Additional Info: ${extra || 'None'}

        Provide the response in raw JSON format WITHOUT ANY markdown blocks or wrappers. The JSON must have the following schema:
        {
          "careers": [
            {
              "title": "string",
              "description": "string (Why this fits the student)",
              "requiredSubjects": ["string"],
              "universityCourses": ["string"],
              "salaryRangeNGN": "string (Estimated monthly or annual in Naira)",
              "futureDemand": "string (High/Medium/Low with brief reason)",
              "keySkills": ["string"]
            }
          ],
          "academicGuidance": {
            "suggestedSubjects": ["string"],
            "extracurriculars": ["string"],
            "nextSteps": ["string (e.g., online courses or activities to try)"]
          }
        }
      `;

      let response;
      let attempt = 0;
      const maxRetries = 3;
      
      while (attempt < maxRetries) {
        try {
          response = await ai.models.generateContent({
            model: 'gemini-3.1-flash-lite',
            contents: prompt,
            config: {
                temperature: 0.7,
                responseMimeType: 'application/json',
            }
          });
          break;
        } catch (e: any) {
          attempt++;
          if (attempt >= maxRetries || (!e.message?.includes('503') && !e.message?.includes('429'))) {
            throw e;
          }
          await new Promise(resolve => setTimeout(resolve, 2000 * attempt));
        }
      }
      
      const rawText = response?.text || '{}';
      const parsedData = JSON.parse(rawText);

      res.json(parsedData);
    } catch (error: any) {
      console.error('Error generating career matches:', error);
      res.status(500).json({ error: 'Failed to generate career matches' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
