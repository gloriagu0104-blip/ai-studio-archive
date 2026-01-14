import React, { useState } from 'react';
import { QUESTIONS } from '../constants';
import { UserAnswers } from '../types';

interface QuizProps {
  onComplete: (answers: UserAnswers) => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<UserAnswers>>({});
  const [recipientName, setRecipientName] = useState("");
  const [isExiting, setIsExiting] = useState(false);

  const totalSteps = QUESTIONS.length + 1; // +1 for the recipient name

  const handleOptionSelect = (value: string) => {
    setIsExiting(true);
    setTimeout(() => {
      setAnswers(prev => ({ ...prev, [QUESTIONS[currentStep].id]: value }));
      setCurrentStep(prev => prev + 1);
      setIsExiting(false);
    }, 300);
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName.trim()) return;
    
    const finalAnswers: UserAnswers = {
      ...(answers as UserAnswers),
      recipient: recipientName
    };
    onComplete(finalAnswers);
  };

  // Progress bar calculation
  const progress = ((currentStep + 1) / totalSteps) * 100;

  if (currentStep < QUESTIONS.length) {
    const question = QUESTIONS[currentStep];

    return (
      <div className="flex flex-col min-h-screen max-w-md mx-auto p-6 relative">
        {/* Header / Progress */}
        <div className="w-full h-1 bg-stone-200 rounded-full mb-8 mt-4 overflow-hidden">
          <div 
            className="h-full bg-blush-500 transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className={`flex-1 flex flex-col justify-center transition-all duration-300 ${isExiting ? 'opacity-0 translate-x-[-20px]' : 'opacity-100 translate-x-0'}`}>
          <span className="text-blush-500 font-bold text-sm tracking-widest mb-4 uppercase">
            Question 0{currentStep + 1}
          </span>
          <h2 className="text-2xl font-bold text-stone-800 mb-8 leading-snug">
            {question.text}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionSelect(option.value)}
                className="w-full text-left p-4 rounded-xl bg-white border-2 border-transparent hover:border-blush-200 hover:bg-blush-50 text-stone-600 font-semibold transition-all duration-200 shadow-sm active:scale-[0.98] flex items-center justify-between group"
              >
                {option.label}
                <span className="opacity-0 group-hover:opacity-100 text-blush-500 transition-opacity">
                  ●
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Final Step: Name Input
  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto p-6 relative justify-center">
       <div className="w-full h-1 bg-stone-200 rounded-full mb-8 absolute top-10 left-6 right-6 w-auto overflow-hidden">
          <div 
            className="h-full bg-blush-500 transition-all duration-500 ease-out" 
            style={{ width: `100%` }}
          />
        </div>

      <div className="animate-fade-in text-center">
        <h2 className="text-2xl font-bold text-stone-800 mb-2">
          Who is this for?
        </h2>
        <p className="text-stone-500 mb-8">
          This will be engraved on the card.
        </p>

        <form onSubmit={handleNameSubmit} className="space-y-6">
          <input
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            placeholder="Name, Nickname, or 'Me'"
            className="w-full p-4 text-center text-xl font-bold rounded-2xl bg-white border-2 border-stone-200 focus:border-blush-500 focus:outline-none focus:ring-4 focus:ring-blush-100 transition-all text-stone-800 placeholder-stone-300"
            autoFocus
          />

          <button
            type="submit"
            disabled={!recipientName.trim()}
            className="w-full py-4 bg-stone-850 text-white rounded-full font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all hover:-translate-y-1"
          >
            Generate Blind Box
          </button>
        </form>
      </div>
    </div>
  );
};

export default Quiz;
