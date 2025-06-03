
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Droplets, Thermometer, Gauge, Activity } from 'lucide-react';

interface WaterParameter {
  name: string;
  value: number;
  maxValue: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  icon: React.ReactNode;
}

const WaterParametersCard: React.FC = () => {
  const parameters: WaterParameter[] = [
    {
      name: 'pH Level',
      value: 7.2,
      maxValue: 14,
      unit: 'pH',
      status: 'good',
      icon: <Droplets className="h-5 w-5" />
    },
    {
      name: 'Temperature',
      value: 24.5,
      maxValue: 40,
      unit: '°C',
      status: 'good',
      icon: <Thermometer className="h-5 w-5" />
    },
    {
      name: 'Turbidity',
      value: 2.1,
      maxValue: 10,
      unit: 'NTU',
      status: 'good',
      icon: <Activity className="h-5 w-5" />
    },
    {
      name: 'Salinity',
      value: 35.2,
      maxValue: 50,
      unit: 'ppt',
      status: 'warning',
      icon: <Gauge className="h-5 w-5" />
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-400';
      case 'warning':
        return 'text-yellow-400';
      case 'critical':
        return 'text-red-400';
      default:
        return 'text-aquarium-light';
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-aquarium-cyan';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-aquarium-dark/90 to-aquarium-medium/70 backdrop-blur-sm border-2 border-aquarium-light/40 p-6 hover:border-aquarium-cyan/60 transition-all duration-500 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-aquarium-cyan text-xl animate-glow">
          <Droplets />
        </div>
        <h3 className="text-white text-xl font-bold">Water Parameters</h3>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {parameters.map((param, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`${getStatusColor(param.status)} animate-pulse`}>
                  {param.icon}
                </div>
                <span className="text-white font-medium text-sm">{param.name}</span>
              </div>
              <span className={`text-sm font-bold ${getStatusColor(param.status)}`}>
                {param.value} {param.unit}
              </span>
            </div>
            
            <div className="relative">
              <Progress 
                value={(param.value / param.maxValue) * 100} 
                className="h-3 bg-aquarium-deep/50"
              />
              <div 
                className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-300 ${getProgressColor(param.status)}`}
                style={{ width: `${Math.min((param.value / param.maxValue) * 100, 100)}%` }}
              />
            </div>
            
            <div className="flex justify-between text-xs text-aquarium-light/70">
              <span>0</span>
              <span>{param.maxValue} {param.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default WaterParametersCard;
