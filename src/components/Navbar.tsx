
import React from 'react';
import { Settings, Waves } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <nav className="relative z-20 bg-gradient-to-r from-aquarium-deep/95 via-aquarium-dark/90 to-aquarium-deep/95 backdrop-blur-sm border-b border-aquarium-cyan/30 px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-aquarium-cyan animate-wave">
            <Waves className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wide">
            AQUARIUM CONTROL PANEL
          </h1>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon"
          className="text-aquarium-light hover:text-aquarium-cyan hover:bg-aquarium-cyan/10 transition-all duration-300 hover:scale-110 hover:rotate-12"
        >
          <Settings className="h-6 w-6" />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
