
import React from 'react';
import { Settings, Waves, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useTheme } from '@/contexts/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

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
        
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-aquarium-light hover:text-aquarium-cyan hover:bg-aquarium-cyan/10 transition-all duration-300 hover:scale-110 hover:rotate-12"
            >
              <Settings className="h-6 w-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 bg-aquarium-dark/95 border-aquarium-cyan/30 backdrop-blur-sm">
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-lg">Settings</h3>
              <Button
                onClick={toggleTheme}
                className="w-full flex items-center gap-3 bg-aquarium-medium/70 hover:bg-aquarium-cyan/20 text-white border border-aquarium-cyan/30 hover:border-aquarium-cyan/60 transition-all duration-300"
              >
                <Palette className="h-5 w-5" />
                Theme: {theme === 'light' ? 'Light' : 'Dark'}
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
};

export default Navbar;
