
import React, { useState } from 'react';
import ControlCard from '@/components/ControlCard';
import FloatingBubbles from '@/components/FloatingBubbles';
import Navbar from '@/components/Navbar';
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
      
      {/* Navbar */}
      <Navbar />
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-aquarium-deep/50 to-transparent pointer-events-none z-10" />
      
      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-aquarium-light text-lg hover:text-aquarium-cyan transition-colors duration-300">
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
      </div>
    </div>
  );
};

export default Index;
