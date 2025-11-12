import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SensorCardProps {
  title: string;
  icon: React.ReactNode;
  value: number;
  unit: string;
  metric1Label: string;
  metric1Value: number;
  metric2Label: string;
  metric2Value: number;
  status: 'excellent' | 'good' | 'moderate' | 'poor' | 'critical';
  statusLabel: string;
}

const SensorCard: React.FC<SensorCardProps> = ({
  title,
  icon,
  value,
  unit,
  metric1Label,
  metric1Value,
  metric2Label,
  metric2Value,
  status,
  statusLabel,
}) => {
  const statusColors = {
    excellent: 'border-success text-success',
    good: 'border-success text-success',
    moderate: 'border-warning text-warning',
    poor: 'border-destructive text-destructive',
    critical: 'border-destructive text-destructive',
  };

  const statusBg = {
    excellent: 'bg-success/10',
    good: 'bg-success/10',
    moderate: 'bg-warning/10',
    poor: 'bg-destructive/10',
    critical: 'bg-destructive/10',
  };

  return (
    <Card className={cn(
      "gradient-card border-2 transition-all duration-300 hover:scale-105 pulse-glow p-6",
      statusColors[status]
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn("p-3 rounded-xl", statusBg[status])}>
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{title}</h3>
            <p className={cn("text-xs font-medium", statusColors[status])}>
              {statusLabel}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-end gap-2">
          <span className="text-4xl font-bold text-foreground animate-pulse-slow">
            {value}
          </span>
          <span className="text-lg text-muted-foreground mb-1">{unit}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">{metric1Label}</p>
            <p className="text-lg font-semibold text-foreground">{metric1Value}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{metric2Label}</p>
            <p className="text-lg font-semibold text-foreground">{metric2Value}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SensorCard;
