import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Loading..." 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      {/* Outer ring */}
      <div className="relative w-20 h-20">
        {/* Background ring */}
        <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
        
        {/* Spinning gradient ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-wellness-lavender animate-spin-slow"></div>
        
        {/* Inner glow */}
        <div className="absolute inset-2 rounded-full gradient-primary opacity-20 animate-pulse-soft"></div>
        
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full gradient-primary shadow-glow"></div>
        </div>
      </div>
      
      {/* Loading message */}
      <p className="mt-6 text-muted-foreground text-center font-medium animate-pulse-soft">
        {message}
      </p>
      
      {/* Decorative dots */}
      <div className="flex gap-1.5 mt-4">
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 rounded-full bg-wellness-lavender animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 rounded-full bg-wellness-coral animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
