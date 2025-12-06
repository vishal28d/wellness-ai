import React from 'react';
import { WellnessTip } from '@/context/AppContext';

interface TipCardProps {
  tip: WellnessTip;
  onClick: () => void;
  index: number;
}

const TipCard: React.FC<TipCardProps> = ({ tip, onClick, index }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full glass-card rounded-2xl p-5 text-left hover-lift opacity-0 animate-fade-in-up focus:outline-none focus:ring-2 focus:ring-primary/50 group`}
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-start gap-4">
        {/* Icon container */}
        <div className="flex-shrink-0 w-14 h-14 rounded-xl gradient-primary flex items-center justify-center text-2xl shadow-soft group-hover:shadow-glow transition-shadow duration-300">
          {tip.icon}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-lg mb-1 group-hover:text-primary transition-colors">
            {tip.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
            {tip.shortDescription}
          </p>
        </div>
        
        {/* Arrow indicator */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
          <svg 
            className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  );
};

export default TipCard;
