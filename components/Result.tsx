import React, { useRef } from 'react';
import { GeneratedResult, UserAnswers } from '../types';
import { RARITY_COLORS, RARITY_LABELS } from '../constants';

interface ResultProps {
  result: GeneratedResult;
  answers: UserAnswers;
  onReset: () => void;
}

const Result: React.FC<ResultProps> = ({ result, answers, onReset }) => {
  const { data, imageUrl } = result;
  const cardRef = useRef<HTMLDivElement>(null);

  // Dynamic background style based on generated colors
  const bgStyle = {
    background: data.colors.length > 1 
      ? `linear-gradient(135deg, ${data.colors[0]} 0%, ${data.colors[1]} 100%)`
      : data.colors[0] || '#FDFBF7'
  };

  // Determine rarity styling
  const rarityClass = RARITY_COLORS[data.rarity] || RARITY_COLORS['C'];
  const rarityLabel = RARITY_LABELS[data.rarity] || 'BASIC';

  return (
    <div className="min-h-screen bg-stone-50 py-10 px-6 flex flex-col items-center justify-center animate-fade-in">
      
      {/* The Collectible Card */}
      <div 
        ref={cardRef}
        className="w-full max-w-sm bg-white rounded-[2rem] shadow-2xl overflow-hidden relative transform transition-all hover:scale-[1.01] duration-500"
      >
        {/* Image Section */}
        <div 
            className="aspect-square w-full relative p-8 flex items-center justify-center"
            style={bgStyle}
        >
          {/* Hardware Ring Visual (CSS only) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-4 border-stone-300 rounded-full z-20 bg-transparent shadow-sm"></div>
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-1 h-8 bg-stone-300 z-10"></div>

          <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden shadow-inner bg-white/20 backdrop-blur-sm p-2">
            <img 
              src={imageUrl} 
              alt={data.characterName} 
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Rarity Badge */}
          <div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-xs font-black tracking-widest border ${rarityClass} uppercase shadow-sm z-30`}>
            {data.rarity} // {rarityLabel}
          </div>
        </div>

        {/* Info Section */}
        <div className="p-8 text-center relative bg-white">
          <div className="mb-6">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">
              Keychain Crush
            </h3>
            <h1 className="text-3xl font-black text-stone-800 leading-tight">
              {data.characterName}
            </h1>
          </div>

          <div className="bg-cream-50 rounded-2xl p-6 mb-8 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 text-xl text-stone-300">❝</div>
            <p className="text-stone-600 font-medium italic leading-relaxed">
              To <span className="text-blush-500 font-bold">{answers.recipient}</span>
              <br/>
              {data.quote}
            </p>
          </div>

          <div className="flex justify-between items-center text-xs font-bold text-stone-400 border-t border-stone-100 pt-6">
            <span>#{Math.floor(Math.random() * 9000) + 1000}</span>
            <span>TYPE: {data.species.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-4 w-full max-w-sm">
        <button 
          onClick={onReset}
          className="flex-1 py-4 bg-white text-stone-800 rounded-full font-bold shadow-md hover:shadow-lg transition-all active:scale-95 border border-stone-100"
        >
          Play Again
        </button>
        {/* Save/Share placeholder - in real app would use canvas-to-image */}
        <button 
          className="flex-1 py-4 bg-stone-850 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all active:scale-95"
          onClick={() => alert("Screenshot to save your Blind Box!")}
        >
          Save Card
        </button>
      </div>

    </div>
  );
};

export default Result;
