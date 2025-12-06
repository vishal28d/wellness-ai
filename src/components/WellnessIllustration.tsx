import React from 'react';

const WellnessIllustration: React.FC = () => {
  return (
    <div className="relative w-48 h-48 mx-auto animate-float">
      {/* Background circles */}
      <div className="absolute inset-0 rounded-full gradient-primary opacity-10 blur-xl"></div>
      <div className="absolute inset-4 rounded-full bg-wellness-lavender opacity-20 blur-lg"></div>
      
      {/* Main illustration container */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Outer ring */}
        <div className="absolute w-40 h-40 rounded-full border-2 border-primary/30"></div>
        
        {/* Middle ring with gradient */}
        <div className="absolute w-32 h-32 rounded-full gradient-primary opacity-20"></div>
        
        {/* Inner elements */}
        <div className="relative w-24 h-24 rounded-full glass-card flex items-center justify-center">
          {/* Heart icon */}
          <div className="text-5xl animate-pulse-soft">🧘</div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-2 right-4 text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>
          ✨
        </div>
        <div className="absolute bottom-4 left-2 text-xl animate-bounce" style={{ animationDelay: '0.3s' }}>
          🌿
        </div>
        <div className="absolute top-8 left-6 text-lg animate-bounce" style={{ animationDelay: '0.7s' }}>
          💫
        </div>
        <div className="absolute bottom-8 right-6 text-xl animate-bounce" style={{ animationDelay: '0.2s' }}>
          🌸
        </div>
      </div>
    </div>
  );
};

export default WellnessIllustration;
