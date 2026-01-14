import React from 'react';

interface WelcomeProps {
  onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center animate-fade-in relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-yellow-100 rounded-full blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-blush-100 rounded-full blur-3xl opacity-50 -z-10"></div>

      <div className="mb-8 relative">
        <div className="w-32 h-32 bg-white rounded-3xl shadow-lg flex items-center justify-center transform rotate-6 animate-float">
          <span className="text-6xl filter drop-shadow-sm">🧸</span>
        </div>
        <div className="w-32 h-32 bg-cream-300 rounded-3xl shadow-sm absolute top-0 left-0 -z-10 transform -rotate-3"></div>
      </div>

      <h1 className="text-4xl font-black text-stone-850 mb-2 tracking-tight">
        Keychain<span className="text-blush-500">Crush</span>
      </h1>
      
      <p className="text-stone-600 text-lg font-medium mb-10 max-w-xs leading-relaxed">
        Turn your mood into a tiny companion.
        <br/>
        <span className="text-sm opacity-70 mt-2 block font-normal">No photos, just feelings.</span>
      </p>

      <button
        onClick={onStart}
        className="group relative px-8 py-4 bg-stone-850 text-cream-50 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 w-full max-w-[280px]"
      >
        Start
        <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">➜</span>
      </button>

      <div className="mt-12 text-xs text-stone-400 font-medium">
        Made for the little moments.
      </div>
    </div>
  );
};

export default Welcome;
