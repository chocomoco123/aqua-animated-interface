
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Power, Settings, Lightbulb, Circle, Edit } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface ControlCardProps {
  title: string;
  icon: React.ReactNode;
  isActive: boolean;
  onToggle: (isActive: boolean) => void;
  onRename?: (newName: string) => void;
}

const ControlCard: React.FC<ControlCardProps> = ({ title, icon, isActive, onToggle, onRename }) => {
  const [mode, setMode] = useState<'off' | 'auto' | 'on'>('off');
  const [autoInterval, setAutoInterval] = useState<NodeJS.Timeout | null>(null);
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [newName, setNewName] = useState(title);

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
    
    console.log(`${title} mode changed to: ${newMode}`);
  };

  const getButtonColor = (buttonMode: 'off' | 'auto' | 'on') => {
    if (mode === buttonMode) {
      switch (buttonMode) {
        case 'off':
          return 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30 border-2 border-red-400';
        case 'auto':
          return 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg shadow-yellow-500/30 border-2 border-yellow-400';
        case 'on':
          return 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30 border-2 border-green-400';
      }
    }
    return 'text-aquarium-light hover:text-aquarium-cyan hover:bg-aquarium-light/10 border border-aquarium-light/30 hover:border-aquarium-cyan/50 hover:shadow-md hover:shadow-aquarium-cyan/20';
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

  const handleRename = () => {
    if (onRename && newName.trim()) {
      onRename(newName.trim());
      setIsRenameOpen(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-aquarium-dark/90 to-aquarium-medium/70 backdrop-blur-sm border-2 border-aquarium-light/40 p-6 hover:border-aquarium-cyan/60 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-aquarium-cyan/20 hover:scale-[1.02] transform hover:-translate-y-1 min-h-[300px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="text-aquarium-cyan text-2xl animate-glow hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <h3 className="text-white text-xl font-semibold hover:text-aquarium-cyan transition-colors duration-300">{title}</h3>
        </div>
        <Dialog open={isRenameOpen} onOpenChange={setIsRenameOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-aquarium-light hover:text-aquarium-cyan transition-all duration-300 hover:scale-110 hover:rotate-12 hover:bg-aquarium-cyan/10"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-aquarium-dark/95 border-aquarium-cyan/30 backdrop-blur-sm">
            <DialogHeader>
              <DialogTitle className="text-white">Rename Control</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter new name"
                className="bg-aquarium-medium/50 border-aquarium-cyan/30 text-white placeholder:text-aquarium-light/60"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleRename}
                  className="bg-aquarium-cyan hover:bg-aquarium-teal text-white"
                >
                  Save
                </Button>
                <Button
                  onClick={() => setIsRenameOpen(false)}
                  variant="outline"
                  className="border-aquarium-light/30 text-aquarium-light hover:bg-aquarium-light/10"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2 mb-6 p-3 bg-aquarium-deep/50 rounded-lg border border-aquarium-light/20 hover:border-aquarium-cyan/40 transition-all duration-300 hover:bg-aquarium-deep/70">
        <Circle 
          className={`h-3 w-3 ${getStatusColor()} fill-current animate-pulse`}
        />
        <span className={`text-sm font-medium ${getStatusColor()}`}>
          {getStatusText()}
        </span>
      </div>

      <div className="flex-1 flex items-end">
        <div className="w-full grid grid-cols-3 gap-3 p-4 bg-aquarium-deep/30 rounded-lg border-2 border-aquarium-light/30 hover:border-aquarium-cyan/50 transition-all duration-300">
          <Button
            className={`flex flex-col items-center gap-2 h-20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${getButtonColor('off')}`}
            onClick={() => handleModeChange('off')}
          >
            <Power className="h-6 w-6" />
            <span className="text-sm font-medium">Off</span>
          </Button>

          <Button
            className={`flex flex-col items-center gap-2 h-20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${getButtonColor('auto')}`}
            onClick={() => handleModeChange('auto')}
          >
            <Circle className="h-6 w-6" />
            <span className="text-sm font-medium">Auto</span>
          </Button>

          <Button
            className={`flex flex-col items-center gap-2 h-20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${getButtonColor('on')}`}
            onClick={() => handleModeChange('on')}
          >
            <Lightbulb className="h-6 w-6" />
            <span className="text-sm font-medium">On</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ControlCard;
