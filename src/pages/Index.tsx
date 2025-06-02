
import React, { useState } from 'react';
import ControlCard from '@/components/ControlCard';
import FloatingBubbles from '@/components/FloatingBubbles';
import { Lightbulb, Circle } from 'lucide-react';

const Index = () => {
  const [mainLightActive, setMainLightActive] = useState(true);
  const [nightLightActive, setNightLightActive] = useState(false);

  const toggleMainLight = () => {
    setMainLightActive(!mainLightActive);
    console.log('Main light toggled:', !mainLightActive);
  };

  const toggleNightLight = () => {
    setNightLightActive(!nightLightActive);
    console.log('Night light toggled:', !nightLightActive);
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
            <div className="text-aquarium-cyan text-4xl animate-wave">
              🌊
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Aquarium Control Panel
            </h1>
          </div>
          <p className="text-aquarium-light text-lg">
            Manage your aquarium lighting and environment controls
          </p>
        </div>

        {/* Control Cards Grid */}
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

        {/* Additional Decorative Elements */}
        <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-aquarium-deep/80 to-transparent pointer-events-none">
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex gap-4 text-aquarium-cyan/40">
              <div className="animate-wave" style={{ animationDelay: '0s' }}>🐠</div>
              <div className="animate-wave" style={{ animationDelay: '0.5s' }}>🐟</div>
              <div className="animate-wave" style={{ animationDelay: '1s' }}>🐠</div>
              <div className="animate-wave" style={{ animationDelay: '1.5s' }}>🐟</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
