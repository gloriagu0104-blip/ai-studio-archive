import React, { useEffect, useState } from 'react';

const MESSAGES = [
  "Mixing the vinyl...",
  "Pouring into the mold...",
  "Sculpting the expression...",
  "Polishing the surface...",
  "Attaching the keychain...",
  "Boxing it up...",
];

const Loading: React.FC = () => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-cream-50">
      <div className="relative mb-12">
        {/* Simple CSS Box Representation */}
        <div className="w-32 h-32 bg-stone-800 rounded-xl relative animate-shake flex items-center justify-center shadow-2xl z-10">
            <span className="text-5xl">❓</span>
            {/* Box Lid Detail */}
            <div className="absolute top-0 w-full h-8 bg-stone-700 rounded-t-xl border-b border-stone-600"></div>
        </div>
        {/* Shadow */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-black opacity-10 rounded-full blur-md"></div>
        
        {/* Floating particles */}
        <div className="absolute -top-10 -left-10 text-2xl animate-bounce delay-100">✨</div>
        <div className="absolute -top-4 -right-12 text-xl animate-bounce delay-300">🖌️</div>
      </div>

      <h2 className="text-xl font-bold text-stone-700 mb-2 animate-pulse">
        Opening Blind Box...
      </h2>
      <p className="text-stone-400 font-medium h-6">
        {MESSAGES[msgIndex]}
      </p>
    </div>
  );
};

export default Loading;
