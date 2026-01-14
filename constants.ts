import { Question, Rarity } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "What color is your mood today?",
    options: [
      { label: "Creamy White (Blank)", value: "Creamy White" },
      { label: "Pastel Pink (Soft)", value: "Pastel Pink" },
      { label: "Midnight Blue (Deep)", value: "Midnight Blue" },
      { label: "Mint Green (Fresh)", value: "Mint Green" },
      { label: "Fuzzy Grey (Blurry)", value: "Fuzzy Grey" },
    ]
  },
  {
    id: 2,
    text: "How does your heart feel right now?",
    options: [
      { label: "Needs a hug", value: "Needing a hug" },
      { label: "A bit sulky", value: "Sulky/Wronged" },
      { label: "Pretending to be okay", value: "Pretending to be okay" },
      { label: "Secretly happy", value: "Secretly happy" },
      { label: "Just... empty", value: "Empty" },
    ]
  },
  {
    id: 3,
    text: "Current emotional battery level?",
    options: [
      { label: "10% (Low Power)", value: "10% Battery" },
      { label: "50% (Hanging in there)", value: "50% Battery" },
      { label: "80% (Doing okay)", value: "80% Battery" },
      { label: "100% (Fully charged)", value: "100% Battery" },
    ]
  },
  {
    id: 4,
    text: "If I'm hanging on your bag, I should:",
    options: [
      { label: "Stay quiet & close", value: "Quietly accompanying" },
      { label: "Swing around happily", value: "Dangling around" },
      { label: "Get a head pat", value: "Being petted" },
      { label: "Just don't lose me", value: "Unnoticed but safe" },
    ]
  },
  {
    id: 5,
    text: "Your texture/aura today is:",
    options: [
      { label: "Soft & Fluffy", value: "Soft" },
      { label: "Cool & Distant", value: "Cold/Cool" },
      { label: "Sticky & Clingy", value: "Clingy/Sticky" },
      { label: "Prickly / Awkward", value: "Awkward/Tsundere" },
      { label: "A chaotic mix", value: "Chaotic mix" },
    ]
  },
];

export const RARITY_COLORS: Record<Rarity, string> = {
  'C': 'text-gray-500 bg-gray-100 border-gray-200',
  'B': 'text-blue-500 bg-blue-50 border-blue-100',
  'A': 'text-purple-500 bg-purple-50 border-purple-100',
  'S': 'text-orange-500 bg-orange-50 border-orange-100',
  'SS': 'text-rose-500 bg-rose-50 border-rose-100',
  'SSS': 'text-yellow-600 bg-yellow-50 border-yellow-200 shadow-yellow-100 shadow-lg',
};

export const RARITY_LABELS: Record<Rarity, string> = {
  'C': 'BASIC',
  'B': 'COMMON',
  'A': 'RARE',
  'S': 'SUPER',
  'SS': 'SECRET',
  'SSS': 'LEGEND',
};