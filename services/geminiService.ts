import { GoogleGenAI, Type } from "@google/genai";
import { UserAnswers, BlindBoxData } from "../types";

// Safety check for API Key
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY is missing. Please set it in the environment.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || '' });

// 1. Generate Character Metadata (Text)
export const generateCharacterData = async (answers: UserAnswers): Promise<BlindBoxData> => {
  const prompt = `
    You are a creative Art Toy Designer for a "Keychain Crush" app.
    
    User Context:
    - Mood Color: ${answers[1]}
    - Inner state: ${answers[2]}
    - Energy level: ${answers[3]}
    - Interaction style: ${answers[4]}
    - Vibe: ${answers[5]}
    - Recipient Name: ${answers.recipient}

    Task:
    Create a **CUTE & HEALING VINYL ART TOY** keychain character.
    
    Style Direction (STRICT):
    - **Reference**: POP MART Crybaby style (Molly). 
    - **Core Vibe**: CUTE, SAFE, HEALING, SOFT. 
    - **Emotion**: "Sulky", "Pouting", "Teary-eyed", "Shy", or "Need a hug". 
    - **Avoid**: Creepy, horror, uncanny valley, distorted faces, menacing stares, weird textures.
    
    Visual Rules:
    - **Material**: Smooth matte Vinyl / PVC. Clean and soft.
    - **Proportions**: Chibi style. Big head, small cute body, round limbs. Toy-like joints.
    - **Face**: Big expressive eyes (glassy or teary), small cute nose/mouth. 
    - **Cleanliness**: NO TEXT, NO TATTOOS, NO SYMBOLS on the body.
    - **Color Palette**: MUST match the user's "Mood Color" preference (${answers[1]}) but in a pastel/vinyl toy aesthetic.
    
    Output JSON with:
    1. rarity: Choose one from [C, B, A, S, SS, SSS] based on a weighted random chance.
    2. species: The character's type (e.g., "Sulky Bear", "Teary Cloud").
    3. characterName: A creative, cute name in English.
    4. description: A visual description of the toy.
    5. quote: A very short, cute, playful sentence. Max 10 words. 
       - **Style**: "Useless but sincere". 
       - **Tone**: Witty, warm, clingy. NOT pitiful, NOT sad, NOT depressing. 
       - **Examples**: "Not useful, but very true.", "Just here to hang out.", "Tiny but mighty.", "Occupying space softly.", "Zero thoughts, full heart."
    6. visualPrompt: A highly detailed stable-diffusion style prompt for generating the image. 
       - **MANDATORY KEYWORDS**: "cute 3d render, pop mart style, crybaby style, soft vinyl toy, pastel colors, studio lighting, octane render, c4d, kawaii, metal keychain loop on head".
       - **Description**: Describe big round eyes, soft pout, blushing cheeks.
       - **Color**: Soft, pastel, creamy, low saturation.
       - **Background**: Solid soft pastel color matching the character.
    7. colors: An array of 2 hex codes (soft pastel colors) derived from the character design.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          rarity: { type: Type.STRING, enum: ['C', 'B', 'A', 'S', 'SS', 'SSS'] },
          species: { type: Type.STRING },
          characterName: { type: Type.STRING },
          description: { type: Type.STRING },
          quote: { type: Type.STRING },
          visualPrompt: { type: Type.STRING },
          colors: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ['rarity', 'species', 'characterName', 'description', 'quote', 'visualPrompt', 'colors'],
      },
    }
  });

  const text = response.text;
  if (!text) {
    throw new Error("Failed to generate character data");
  }

  return JSON.parse(text) as BlindBoxData;
};

// 2. Generate Toy Image
export const generateToyImage = async (visualPrompt: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { text: visualPrompt },
      ],
    },
    config: {
        imageConfig: {
          aspectRatio: "1:1",
        },
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    // Find the image part, do not assume it is the first part.
    if (part.inlineData && part.inlineData.data) {
      return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
  }
  
  throw new Error("No image generated");
};