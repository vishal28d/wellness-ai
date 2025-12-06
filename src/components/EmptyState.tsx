import React from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  title, 
  description, 
  actionLabel, 
  onAction 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 animate-fade-in">
      {/* Illustration */}
      <div className="relative w-32 h-32 mb-6">
        <div className="absolute inset-0 rounded-full bg-muted animate-pulse-soft"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-5xl">📭</div>
        </div>
        {/* Floating stars */}
        <div className="absolute -top-2 -right-2 text-xl animate-bounce" style={{ animationDelay: '0.2s' }}>
          ⭐
        </div>
        <div className="absolute -bottom-1 -left-2 text-lg animate-bounce" style={{ animationDelay: '0.5s' }}>
          ✨
        </div>
      </div>
      
      {/* Text content */}
      <h3 className="text-xl font-semibold text-foreground mb-2 text-center">
        {title}
      </h3>
      <p className="text-muted-foreground text-center max-w-xs mb-6">
        {description}
      </p>
      
      {/* Action button */}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition-all duration-300 hover-lift"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
