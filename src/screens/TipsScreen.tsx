import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { generateWellnessTips } from '@/services/aiService';
import LoadingSpinner from '@/components/LoadingSpinner';
import TipCard from '@/components/TipCard';

const TipsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { profile, tips, setTips, setSelectedTip } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  
  const fetchTips = async (isRegenerate = false) => {
    if (!profile) {
      navigate('/');
      return;
    }
    
    if (isRegenerate) {
      setIsRegenerating(true);
    } else {
      setIsLoading(true);
    }
    
    try {
      const newTips = await generateWellnessTips(profile);
      setTips(newTips);
    } catch (error) {
      console.error('Error generating tips:', error);
    } finally {
      setIsLoading(false);
      setIsRegenerating(false);
    }
  };
  
  useEffect(() => {
    if (!profile) {
      navigate('/');
      return;
    }
    
    if (tips.length === 0) {
      fetchTips();
    }
  }, [profile]);
  
  const handleTipClick = (tip: typeof tips[0]) => {
    setSelectedTip(tip);
    navigate('/tip-detail');
  };
  
  if (!profile) {
    return null;
  }
  
  return (
    <div className="min-h-screen pb-28">
      <div className="container max-w-md mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <span>🎯</span>
            <span>{profile.goals.join(' • ')}</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Your Wellness Tips
          </h1>
          <p className="text-muted-foreground">
            Personalized recommendations just for you
          </p>
        </div>
        
        {/* Loading State */}
        {isLoading ? (
          <LoadingSpinner message="Generating your personalized wellness tips..." />
        ) : (
          <>
            {/* Tips List */}
            <div className="space-y-4 mb-6">
              {tips.map((tip, index) => (
                <TipCard
                  key={tip.id}
                  tip={tip}
                  index={index}
                  onClick={() => handleTipClick(tip)}
                />
              ))}
            </div>
            
            {/* Regenerate Button */}
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <button
                onClick={() => fetchTips(true)}
                disabled={isRegenerating}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-medium transition-all duration-300 hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRegenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span>Regenerating...</span>
                  </>
                ) : (
                  <>
                    <span>🔄</span>
                    <span>Regenerate Tips</span>
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TipsScreen;
