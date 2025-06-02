
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Power, Settings, Lightbulb, Circle } from 'lucide-react';

interface ControlCardProps {
  title: string;
  icon: React.ReactNode;
  isActive: boolean;
  onToggle: (isActive: boolean) => void;
}

const ControlCard: React.FC<ControlCardProps> = ({ title, icon, isActive, onToggle }) => {
  const [mode, setMode] = useState<'off' | 'auto' | 'on'>('off');
  const [autoInterval, setAutoInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (mode === 'auto') {
      const interval = setInterval(() => {
        onToggle(!isActive);
      }, 2000);
      setAutoInterval(interval);
      
      return () => {
        if (interval) clearInterval(interval);
      };
    } else {
      if (autoInterval) {
        clearInterval(autoInterval);
        setAutoInterval(null);
      }
    }
  }, [mode, isActive, onToggle]);

  const handleModeChange = (newMode: 'off' | 'auto' | 'on') => {
    setMode(newMode);
    
    if (newMode === 'off') {
      onToggle(false);
    } else if (newMode === 'on') {
      onToggle(true);
    }
    // Auto mode will start its interval in useEffect
    
    console.log(`${title} mode changed to: ${newMode}`);
  };

  const getButtonColor = (buttonMode: 'off' | 'auto' | 'on') => {
    if (mode === buttonMode) {
      switch (buttonMode) {
        case 'off':
          return 'bg-red-500 hover:bg-red-600 text-white';
        case 'auto':
          return 'bg-yellow-500 hover:bg-yellow-600 text-white';
        case 'on':
          return 'bg-green-500 hover:bg-green-600 text-white';
      }
    }
    return 'text-aquarium-light hover:text-aquarium-cyan hover:bg-aquarium-light/10 border border-aquarium-light/30';
  };

  const getStatusColor = () => {
    if (mode === 'auto') {
      return isActive ? 'text-green-400' : 'text-red-400';
    }
    return isActive ? 'text-green-400' : 'text-red-400';
  };

  const getStatusText = () => {
    if (mode === 'auto') {
      return `Auto Mode - ${isActive ? 'ON' : 'OFF'}`;
    }
    return isActive ? 'Active' : 'Inactive';
  };

  return (
    <Card className="bg-gradient-to-br from-aquarium-dark/90 to-aquarium-medium/70 backdrop-blur-sm border-2 border-aquarium-light/40 p-6 hover:border-aquarium-cyan/60 transition-all duration-300 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="text-aquarium-cyan text-2xl animate-glow">
            {icon}
          </div>
          <h3 className="text-white text-xl font-semibold">{title}</h3>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-aquarium-light hover:text-aquarium-cyan transition-colors"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center gap-2 mb-6 p-3 bg-aquarium-deep/50 rounded-lg border border-aquarium-light/20">
        <Circle 
          className={`h-3 w-3 ${getStatusColor()} fill-current`}
        />
        <span className={`text-sm font-medium ${getStatusColor()}`}>
          {getStatusText()}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 p-4 bg-aquarium-deep/30 rounded-lg border border-aquarium-light/30">
        <Button
          className={`flex flex-col items-center gap-2 h-20 transition-all duration-300 ${getButtonColor('off')}`}
          onClick={() => handleModeChange('off')}
        >
          <Power className="h-6 w-6" />
          <span className="text-sm font-medium">Off</span>
        </Button>

        <Button
          className={`flex flex-col items-center gap-2 h-20 transition-all duration-300 ${getButtonColor('auto')}`}
          onClick={() => handleModeChange('auto')}
        >
          <Circle className="h-6 w-6" />
          <span className="text-sm font-medium">Auto</span>
        </Button>

        <Button
          className={`flex flex-col items-center gap-2 h-20 transition-all duration-300 ${getButtonColor('on')}`}
          onClick={() => handleModeChange('on')}
        >
          <Lightbulb className="h-6 w-6" />
          <span className="text-sm font-medium">On</span>
        </Button>
      </div>
    </Card>
  );
};

export default ControlCard;
