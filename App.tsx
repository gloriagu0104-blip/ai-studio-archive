import React, { useState } from 'react';
import Welcome from './components/Welcome';
import Quiz from './components/Quiz';
import Loading from './components/Loading';
import Result from './components/Result';
import { AppState, GeneratedResult, UserAnswers } from './types';
import { generateCharacterData, generateToyImage } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<AppState>('WELCOME');
  const [userAnswers, setUserAnswers] = useState<UserAnswers | null>(null);
  const [result, setResult] = useState<GeneratedResult | null>(null);

  const startQuiz = () => setView('QUIZ');

  const handleQuizComplete = async (answers: UserAnswers) => {
    setUserAnswers(answers);
    setView('LOADING');

    try {
      // 1. Generate Metadata (Character details, text, rarity)
      const data = await generateCharacterData(answers);
      
      // 2. Generate Image based on the visual prompt from metadata
      const imageUrl = await generateToyImage(data.visualPrompt);

      setResult({ data, imageUrl });
      setView('RESULT');
    } catch (error) {
      console.error("Chain failed:", error);
      alert("Oops! The blind box got stuck. Please try again.");
      setView('WELCOME');
    }
  };

  const handleReset = () => {
    setUserAnswers(null);
    setResult(null);
    setView('WELCOME');
  };

  return (
    <div className="bg-cream-50 min-h-screen text-stone-800 font-sans selection:bg-blush-200">
      {view === 'WELCOME' && <Welcome onStart={startQuiz} />}
      {view === 'QUIZ' && <Quiz onComplete={handleQuizComplete} />}
      {view === 'LOADING' && <Loading />}
      {view === 'RESULT' && result && userAnswers && (
        <Result 
          result={result} 
          answers={userAnswers} 
          onReset={handleReset} 
        />
      )}
    </div>
  );
};

export default App;
