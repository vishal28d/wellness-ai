import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import WellnessIllustration from '@/components/WellnessIllustration';

const wellnessGoals = [
  { id: 'Weight Loss', icon: '🏃', label: 'Weight Loss' },
  { id: 'Better Sleep', icon: '😴', label: 'Better Sleep' },
  { id: 'Mental Wellness', icon: '🧘', label: 'Mental Wellness' },
  { id: 'Muscle Gain', icon: '💪', label: 'Muscle Gain' },
  { id: 'Overall Health', icon: '❤️', label: 'Overall Health' },
];

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { setProfile } = useApp();
  
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  
  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId)
        ? prev.filter(g => g !== goalId)
        : [...prev, goalId]
    );
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!age || !gender || selectedGoals.length === 0) {
      return;
    }
    
    setProfile({
      age: parseInt(age),
      gender,
      goals: selectedGoals,
    });
    
    navigate('/tips');
  };
  
  const isFormValid = age && gender && selectedGoals.length > 0;
  
  return (
    <div className="min-h-screen pb-24">
      <div className="container max-w-md mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <WellnessIllustration />
          <h1 className="text-3xl font-bold gradient-text mt-6 mb-2">
            Wellness Journey
          </h1>
          <p className="text-muted-foreground">
            Tell us about yourself to get personalized tips
          </p>
        </div>
        
        {/* Form Card */}
        <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-6 space-y-6 animate-fade-in-up">
          {/* Age Input */}
          <div className="space-y-2">
            <label htmlFor="age" className="block text-sm font-medium text-foreground">
              Your Age
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
              min="1"
              max="120"
              className="w-full px-4 py-3 rounded-xl bg-muted border-2 border-transparent focus:border-primary focus:bg-card transition-all duration-300 outline-none text-foreground placeholder:text-muted-foreground"
            />
          </div>
          
          {/* Gender Select */}
          <div className="space-y-2">
            <label htmlFor="gender" className="block text-sm font-medium text-foreground">
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-muted border-2 border-transparent focus:border-primary focus:bg-card transition-all duration-300 outline-none text-foreground appearance-none cursor-pointer"
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          {/* Wellness Goals */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground">
              Wellness Goals <span className="text-muted-foreground">(select one or more)</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {wellnessGoals.map((goal, index) => (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => toggleGoal(goal.id)}
                  className={`p-4 rounded-xl text-left transition-all duration-300 hover-lift opacity-0 animate-fade-in ${
                    selectedGoals.includes(goal.id)
                      ? 'gradient-primary text-primary-foreground shadow-glow'
                      : 'bg-muted hover:bg-muted/80 text-foreground'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                >
                  <span className="text-2xl block mb-1">{goal.icon}</span>
                  <span className="text-sm font-medium">{goal.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
              isFormValid
                ? 'gradient-accent text-primary-foreground shadow-soft hover:shadow-glow hover-lift'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            Get My Wellness Tips ✨
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileScreen;
