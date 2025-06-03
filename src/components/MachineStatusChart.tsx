
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, Zap, Waves, Thermometer, Fan, Lightbulb } from 'lucide-react';

interface MachineReading {
  time: string;
  mainLight: number;
  filter: number;
  heater: number;
  airPump: number;
  cooler: number;
  nightLight: number;
}

const MachineStatusChart: React.FC = () => {
  const [data, setData] = useState<MachineReading[]>([]);

  useEffect(() => {
    // Generate initial data
    const generateData = () => {
      const now = new Date();
      const newData: MachineReading[] = [];
      
      for (let i = 19; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 30000); // 30 seconds intervals
        newData.push({
          time: time.toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
          }),
          mainLight: Math.random() * 100,
          filter: 60 + Math.random() * 40,
          heater: 40 + Math.random() * 60,
          airPump: 70 + Math.random() * 30,
          cooler: 30 + Math.random() * 40,
          nightLight: Math.random() * 50
        });
      }
      
      return newData;
    };

    setData(generateData());

    // Update data every 2 seconds for real-time effect
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData.slice(1)];
        const now = new Date();
        
        newData.push({
          time: now.toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
          }),
          mainLight: Math.random() * 100,
          filter: 60 + Math.random() * 40,
          heater: 40 + Math.random() * 60,
          airPump: 70 + Math.random() * 30,
          cooler: 30 + Math.random() * 40,
          nightLight: Math.random() * 50
        });
        
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const chartConfig = {
    mainLight: {
      label: "Main Light",
      color: "#fbbf24"
    },
    filter: {
      label: "Filter",
      color: "#06b6d4"
    },
    heater: {
      label: "Heater",
      color: "#ef4444"
    },
    airPump: {
      label: "Air Pump",
      color: "#10b981"
    },
    cooler: {
      label: "Cooler",
      color: "#3b82f6"
    },
    nightLight: {
      label: "Night Light",
      color: "#8b5cf6"
    }
  };

  return (
    <Card className="bg-gradient-to-br from-aquarium-dark/90 to-aquarium-medium/70 backdrop-blur-sm border-2 border-aquarium-light/40 p-6 hover:border-aquarium-cyan/60 transition-all duration-500 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="text-aquarium-cyan text-xl animate-glow">
            <Activity />
          </div>
          <h3 className="text-white text-xl font-bold">Real-time Machine Status</h3>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-lg border border-green-500/30">
          <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-400 text-sm font-medium">Live</span>
        </div>
      </div>

      <div className="h-80 w-full">
        <ChartContainer config={chartConfig}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="mainLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="filter" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="heater" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#4a90b8', fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#4a90b8', fontSize: 12 }}
              domain={[0, 100]}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="mainLight"
              stroke="#fbbf24"
              strokeWidth={2}
              fill="url(#mainLight)"
            />
            <Area
              type="monotone"
              dataKey="filter"
              stroke="#06b6d4"
              strokeWidth={2}
              fill="url(#filter)"
            />
            <Area
              type="monotone"
              dataKey="heater"
              stroke="#ef4444"
              strokeWidth={2}
              fill="url(#heater)"
            />
            <Line
              type="monotone"
              dataKey="airPump"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="cooler"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="nightLight"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ChartContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        {Object.entries(chartConfig).map(([key, config]) => (
          <div key={key} className="flex items-center gap-2 p-2 bg-aquarium-deep/30 rounded-lg">
            <div 
              className="h-3 w-3 rounded-full" 
              style={{ backgroundColor: config.color }}
            />
            <span className="text-white text-sm font-medium">{config.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MachineStatusChart;
