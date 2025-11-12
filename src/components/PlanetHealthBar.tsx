import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface PlanetHealthBarProps {
  health: number;
}

const PlanetHealthBar: React.FC<PlanetHealthBarProps> = ({ health }) => {
  const { t } = useLanguage();
  
  const getHealthStatus = (value: number) => {
    if (value >= 80) return { status: 'excellent', color: 'text-success', label: t('sensors.status.excellent') };
    if (value >= 60) return { status: 'good', color: 'text-success', label: t('sensors.status.good') };
    if (value >= 40) return { status: 'moderate', color: 'text-warning', label: t('sensors.status.moderate') };
    if (value >= 20) return { status: 'poor', color: 'text-destructive', label: t('sensors.status.poor') };
    return { status: 'critical', color: 'text-destructive', label: t('sensors.status.critical') };
  };

  const { color, label } = getHealthStatus(health);

  return (
    <Card className="gradient-card border-2 border-primary p-8 pulse-glow">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{t('health.title')}</h2>
            <p className="text-sm text-muted-foreground mt-1">{t('health.overall')}</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-foreground animate-pulse-slow">
              {health}%
            </div>
            <div className={cn("text-sm font-semibold", color)}>{label}</div>
          </div>
        </div>
        
        <Progress 
          value={health} 
          className="h-4 bg-muted"
        />
      </div>
    </Card>
  );
};

export default PlanetHealthBar;
