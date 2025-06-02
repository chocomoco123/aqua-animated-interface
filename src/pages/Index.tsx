
import React, { useState } from 'react';
import ControlCard from '@/components/ControlCard';
import FloatingBubbles from '@/components/FloatingBubbles';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Lightbulb, Circle } from 'lucide-react';

const Index = () => {
  const [mainLightActive, setMainLightActive] = useState(false);
  const [nightLightActive, setNightLightActive] = useState(false);
  const [mainLightName, setMainLightName] = useState('Main Light');
  const [nightLightName, setNightLightName] = useState('Night Light');

  const toggleMainLight = (isActive: boolean) => {
    setMainLightActive(isActive);
    console.log('Main light toggled:', isActive);
  };

  const toggleNightLight = (isActive: boolean) => {
    setNightLightActive(isActive);
    console.log('Night light toggled:', isActive);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-aquarium-deep via-aquarium-dark to-aquarium-medium relative overflow-hidden">
        <FloatingBubbles />
        <Navbar />
        
        <div className="absolute inset-0 bg-gradient-to-t from-aquarium-deep/50 to-transparent pointer-events-none z-10" />
        
        <div className="relative z-20 container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <p className="text-aquarium-light text-lg hover:text-aquarium-cyan transition-colors duration-300">
              Manage your aquarium lighting and environment controls
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ControlCard
              title={mainLightName}
              icon={<Lightbulb />}
              isActive={mainLightActive}
              onToggle={toggleMainLight}
              onRename={setMainLightName}
            />
            
            <ControlCard
              title={nightLightName}
              icon={<Circle />}
              isActive={nightLightActive}
              onToggle={toggleNightLight}
              onRename={setNightLightName}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
