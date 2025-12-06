import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, DetailedTip } from '@/context/AppContext';
import { generateDetailedTip } from '@/services/aiService';
import LoadingSpinner from '@/components/LoadingSpinner';
import { toast } from '@/hooks/use-toast';

const TipDetailScreen: React.FC = () => {
  const navigate = useNavigate();
  const { selectedTip, addFavorite, removeFavorite, isFavorite } = useApp();
  const [detailedTip, setDetailedTip] = useState<DetailedTip | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!selectedTip) {
      navigate('/tips');
      return;
    }
    
    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        const details = await generateDetailedTip(selectedTip);
        setDetailedTip(details);
      } catch (error) {
        console.error('Error fetching tip details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDetails();
  }, [selectedTip]);
  
  const handleSaveToggle = () => {
    if (!detailedTip) return;
    
    if (isFavorite(detailedTip.id)) {
      removeFavorite(detailedTip.id);
      toast({
        title: "Removed from favorites",
        description: "Tip has been removed from your saved list.",
      });
    } else {
      addFavorite(detailedTip);
      toast({
        title: "Saved to favorites! ⭐",
        description: "You can find this tip in your saved list.",
      });
    }
  };
  
  if (!selectedTip) {
    return null;
  }
  
  const saved = detailedTip ? isFavorite(detailedTip.id) : false;
  
  return (
    <div className="min-h-screen pb-28">
      <div className="container max-w-md mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/tips')}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 animate-fade-in"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Tips</span>
        </button>
        
        {isLoading ? (
          <LoadingSpinner message="Loading detailed insights..." />
        ) : detailedTip ? (
          <div className="space-y-6 animate-fade-in">
            {/* Header Card */}
            <div className="glass-card rounded-3xl p-6 text-center">
              <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center text-4xl mx-auto mb-4 shadow-glow">
                {detailedTip.icon}
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {detailedTip.title}
              </h1>
              <p className="text-muted-foreground">
                {detailedTip.shortDescription}
              </p>
            </div>
            
            {/* Explanation Section */}
            <div className="glass-card rounded-3xl p-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-4">
                <span className="text-xl">📖</span>
                <span>Why This Works</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {detailedTip.explanation.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            
            {/* Steps Section */}
            <div className="glass-card rounded-3xl p-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-4">
                <span className="text-xl">✅</span>
                <span>Action Steps</span>
              </h2>
              <div className="space-y-3">
                {detailedTip.steps.map((step, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full gradient-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </div>
                    <p className="text-foreground text-sm leading-relaxed pt-0.5">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Save Button */}
            <button
              onClick={handleSaveToggle}
              className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover-lift animate-fade-in-up ${
                saved
                  ? 'bg-muted text-foreground border-2 border-wellness-coral'
                  : 'gradient-accent text-primary-foreground shadow-soft hover:shadow-glow'
              }`}
              style={{ animationDelay: '0.3s' }}
            >
              {saved ? (
                <span className="flex items-center justify-center gap-2">
                  <span>⭐</span>
                  <span>Saved to Favorites</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>☆</span>
                  <span>Save to Favorites</span>
                </span>
              )}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TipDetailScreen;
