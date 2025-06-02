
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Power, Settings, Lightbulb, Circle } from 'lucide-react';

interface ControlCardProps {
  title: string;
  icon: React.ReactNode;
  isActive: boolean;
  onToggle: () => void;
}

const ControlCard: React.FC<ControlCardProps> = ({ title, icon, isActive, onToggle }) => {
  const [mode, setMode] = useState<'off' | 'auto' | 'on'>('off');

  const handleModeChange = (newMode: 'off' | 'auto' | 'on') => {
    setMode(newMode);
    if (newMode !== 'off') {
      onToggle();
    }
    console.log(`${title} mode changed to: ${newMode}`);
  };

  return (
    <Card className="bg-gradient-to-br from-aquarium-dark/80 to-aquarium-medium/60 backdrop-blur-sm border-aquarium-light/30 p-6 hover:from-aquarium-dark/90 hover:to-aquarium-medium/70 transition-all duration-300 animate-wave">
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

      <div className="flex items-center gap-2 mb-6">
        <Circle 
          className={`h-3 w-3 ${isActive ? 'fill-green-400 text-green-400' : 'fill-gray-400 text-gray-400'}`} 
        />
        <span className={`text-sm font-medium ${isActive ? 'text-green-400' : 'text-gray-400'}`}>
          {isActive ? 'Active' : 'Inactive'}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Button
          variant={mode === 'off' ? 'default' : 'ghost'}
          className={`flex flex-col items-center gap-2 h-20 ${
            mode === 'off' 
              ? 'bg-aquarium-cyan hover:bg-aquarium-cyan/80 text-white' 
              : 'text-aquarium-light hover:text-aquarium-cyan hover:bg-aquarium-light/10'
          } transition-all duration-300`}
          onClick={() => handleModeChange('off')}
        >
          <Power className="h-6 w-6" />
          <span className="text-sm font-medium">Off</span>
        </Button>

        <Button
          variant={mode === 'auto' ? 'default' : 'ghost'}
          className={`flex flex-col items-center gap-2 h-20 ${
            mode === 'auto' 
              ? 'bg-aquarium-cyan hover:bg-aquarium-cyan/80 text-white' 
              : 'text-aquarium-light hover:text-aquarium-cyan hover:bg-aquarium-light/10'
          } transition-all duration-300`}
          onClick={() => handleModeChange('auto')}
        >
          <Circle className="h-6 w-6" />
          <span className="text-sm font-medium">Auto</span>
        </Button>

        <Button
          variant={mode === 'on' ? 'default' : 'ghost'}
          className={`flex flex-col items-center gap-2 h-20 ${
            mode === 'on' 
              ? 'bg-aquarium-cyan hover:bg-aquarium-cyan/80 text-white' 
              : 'text-aquarium-light hover:text-aquarium-cyan hover:bg-aquarium-light/10'
          } transition-all duration-300`}
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
