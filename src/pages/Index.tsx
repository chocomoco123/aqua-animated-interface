import React, { useState } from 'react';
import ControlCard from '@/components/ControlCard';
import WaterParametersCard from '@/components/WaterParametersCard';
import MachineStatusChart from '@/components/MachineStatusChart';
import FloatingBubbles from '@/components/FloatingBubbles';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Lightbulb, Circle, Waves, Thermometer, Zap, Fan, Wind, Droplet2, Power, Settings2 } from 'lucide-react';

const Index = () => {
  const [mainLightActive, setMainLightActive] = useState(false);
  const [nightLightActive, setNightLightActive] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [heaterActive, setHeaterActive] = useState(false);
  const [airPumpActive, setAirPumpActive] = useState(false);
  const [coolerActive, setCoolerActive] = useState(false);

  const [mainLightName, setMainLightName] = useState('Main Light');
  const [nightLightName, setNightLightName] = useState('Night Light');
  const [filterName, setFilterName] = useState('Water Filter');
  const [heaterName, setHeaterName] = useState('Heater');
  const [airPumpName, setAirPumpName] = useState('Air Pump');
  const [coolerName, setCoolerName] = useState('Cooler');

  const toggleMainLight = (isActive: boolean) => {
    setMainLightActive(isActive);
    console.log('Main light toggled:', isActive);
  };

  const toggleNightLight = (isActive: boolean) => {
    setNightLightActive(isActive);
    console.log('Night light toggled:', isActive);
  };

  const toggleFilter = (isActive: boolean) => {
    setFilterActive(isActive);
    console.log('Filter toggled:', isActive);
  };

  const toggleHeater = (isActive: boolean) => {
    setHeaterActive(isActive);
    console.log('Heater toggled:', isActive);
  };

  const toggleAirPump = (isActive: boolean) => {
    setAirPumpActive(isActive);
    console.log('Air pump toggled:', isActive);
  };

  const toggleCooler = (isActive: boolean) => {
    setCoolerActive(isActive);
    console.log('Cooler toggled:', isActive);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-aquarium-deep via-aquarium-dark to-aquarium-medium relative overflow-hidden">
        <FloatingBubbles />
        <Navbar />
        
        <div className="absolute inset-0 bg-gradient-to-t from-aquarium-deep/50 to-transparent pointer-events-none z-10" />
        
        <div className="relative z-20 container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <p className="text-aquarium-light text-lg hover:text-aquarium-cyan transition-colors duration-300">
              Monitor and control your aquarium environment
            </p>
          </div>

          {/* Dashboard Charts Section */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <WaterParametersCard />
            <MachineStatusChart />
          </div>

          {/* Control Cards Section */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 max-w-full mx-auto">
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

            <ControlCard
              title={filterName}
              icon={<Waves />}
              isActive={filterActive}
              onToggle={toggleFilter}
              onRename={setFilterName}
            />

            <ControlCard
              title={heaterName}
              icon={<Thermometer />}
              isActive={heaterActive}
              onToggle={toggleHeater}
              onRename={setHeaterName}
            />

            <ControlCard
              title={airPumpName}
              icon={<Zap />}
              isActive={airPumpActive}
              onToggle={toggleAirPump}
              onRename={setAirPumpName}
            />

            <ControlCard
              title={coolerName}
              icon={<Fan />}
              isActive={coolerActive}
              onToggle={toggleCooler}
              onRename={setCoolerName}
            />

            <ControlCard
              title="UV Sterilizer"
              icon={<Power />}
              isActive={false}
              onToggle={() => console.log('UV Sterilizer toggled')}
              onRename={() => {}}
            />

            <ControlCard
              title="Water Pump"
              icon={<Droplet2 />}
              isActive={true}
              onToggle={() => console.log('Water Pump toggled')}
              onRename={() => {}}
            />

            <ControlCard
              title="Auto Feeder"
              icon={<Settings2 />}
              isActive={false}
              onToggle={() => console.log('Auto Feeder toggled')}
              onRename={() => {}}
            />

            <ControlCard
              title="Ventilation"
              icon={<Wind />}
              isActive={true}
              onToggle={() => console.log('Ventilation toggled')}
              onRename={() => {}}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
