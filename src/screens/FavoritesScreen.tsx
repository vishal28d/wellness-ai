import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, DetailedTip } from '@/context/AppContext';
import EmptyState from '@/components/EmptyState';
import { toast } from '@/hooks/use-toast';

const FavoritesScreen: React.FC = () => {
  const navigate = useNavigate();
  const { favorites, removeFavorite, setSelectedTip } = useApp();
  const [expandedTip, setExpandedTip] = useState<string | null>(null);
  
  const handleViewTip = (tip: DetailedTip) => {
    setSelectedTip(tip);
    navigate('/tip-detail');
  };
  
  const handleRemove = (tipId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeFavorite(tipId);
    toast({
      title: "Removed from favorites",
      description: "Tip has been removed from your saved list.",
    });
  };
  
  if (favorites.length === 0) {
    return (
      <div className="min-h-screen pb-28">
        <div className="container max-w-md mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-foreground text-center mb-8 animate-fade-in">
            Saved Tips ⭐
          </h1>
          <EmptyState
            title="No saved tips yet"
            description="Explore wellness tips and save your favorites here for quick access."
            actionLabel="Explore Tips"
            onAction={() => navigate('/tips')}
          />
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pb-28">
      <div className="container max-w-md mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Saved Tips ⭐
          </h1>
          <p className="text-muted-foreground">
            {favorites.length} tip{favorites.length !== 1 ? 's' : ''} saved
          </p>
        </div>
        
        {/* Favorites Grid */}
        <div className="space-y-4">
          {favorites.map((tip, index) => (
            <div
              key={tip.id}
              className="glass-card rounded-2xl overflow-hidden opacity-0 animate-fade-in-up hover-lift"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              {/* Card Header - Always visible */}
              <button
                onClick={() => handleViewTip(tip)}
                className="w-full p-5 text-left focus:outline-none"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl gradient-primary flex items-center justify-center text-2xl shadow-soft">
                    {tip.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-lg mb-1">
                      {tip.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {tip.shortDescription}
                    </p>
                  </div>
                </div>
              </button>
              
              {/* Card Footer */}
              <div className="px-5 pb-4 flex items-center justify-between border-t border-border/50 pt-3">
                <button
                  onClick={() => setExpandedTip(expandedTip === tip.id ? null : tip.id)}
                  className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
                >
                  <span>{expandedTip === tip.id ? 'Hide steps' : 'Quick preview'}</span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${expandedTip === tip.id ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => handleRemove(tip.id, e)}
                  className="text-sm text-destructive hover:text-destructive/80 font-medium flex items-center gap-1 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Remove</span>
                </button>
              </div>
              
              {/* Expanded Steps */}
              {expandedTip === tip.id && (
                <div className="px-5 pb-5 animate-fade-in">
                  <div className="p-4 rounded-xl bg-muted/50">
                    <h4 className="text-sm font-semibold text-foreground mb-3">Quick Steps:</h4>
                    <div className="space-y-2">
                      {tip.steps.slice(0, 3).map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-start gap-2 text-sm">
                          <span className="text-primary font-medium">{stepIndex + 1}.</span>
                          <span className="text-muted-foreground">{step}</span>
                        </div>
                      ))}
                      {tip.steps.length > 3 && (
                        <p className="text-xs text-muted-foreground italic pt-1">
                          +{tip.steps.length - 3} more steps...
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritesScreen;
