
import React, { useState } from 'react';
import ControlCard from '@/components/ControlCard';
import FloatingBubbles from '@/components/FloatingBubbles';
import { Lightbulb, Circle } from 'lucide-react';

const Index = () => {
  const [mainLightActive, setMainLightActive] = useState(false);
  const [nightLightActive, setNightLightActive] = useState(false);

  const toggleMainLight = (isActive: boolean) => {
    setMainLightActive(isActive);
    console.log('Main light toggled:', isActive);
  };

  const toggleNightLight = (isActive: boolean) => {
    setNightLightActive(isActive);
    console.log('Night light toggled:', isActive);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-aquarium-deep via-aquarium-dark to-aquarium-medium relative overflow-hidden">
      {/* Floating Bubbles Animation */}
      <FloatingBubbles />
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-aquarium-deep/50 to-transparent pointer-events-none" />
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="text-aquarium-cyan text-4xl">
              <Lightbulb className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Aquarium Control Panel
            </h1>
          </div>
          <p className="text-aquarium-light text-lg">
            Manage your aquarium lighting and environment controls
          </p>
        </div>

        {/* Control Cards Grid - Fixed positioning */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <ControlCard
            title="Main Light"
            icon={<Lightbulb />}
            isActive={mainLightActive}
            onToggle={toggleMainLight}
          />
          
          <ControlCard
            title="Night Light"
            icon={<Circle />}
            isActive={nightLightActive}
            onToggle={toggleNightLight}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
