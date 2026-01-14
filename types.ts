export interface QuestionOption {
  label: string;
  value: string;
}

export interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
}

export type Rarity = 'C' | 'B' | 'A' | 'S' | 'SS' | 'SSS';

export interface UserAnswers {
  [key: number]: string;
  recipient: string;
}

export interface BlindBoxData {
  rarity: Rarity;
  characterName: string;
  species: string;
  description: string;
  quote: string;
  visualPrompt: string;
  colors: string[];
}

export interface GeneratedResult {
  data: BlindBoxData;
  imageUrl: string;
}

export type AppState = 'WELCOME' | 'QUIZ' | 'LOADING' | 'RESULT';
