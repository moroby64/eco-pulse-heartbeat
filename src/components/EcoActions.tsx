import React from 'react';
import { Card } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Droplet, Wind, Sprout, Leaf } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SensorData {
  airQuality: number;
  waterPurity: number;
  soilMoisture: number;
  biodiversity: number;
}

interface EcoActionsProps {
  sensorData: SensorData;
}

const EcoActions: React.FC<EcoActionsProps> = ({ sensorData }) => {
  const { t } = useLanguage();

  const actions = [
    {
      icon: Wind,
      condition: sensorData.airQuality < 60,
      goodMessage: t('actions.airQualityGood'),
      badMessage: t('actions.airQualityLow'),
      type: sensorData.airQuality < 60 ? 'warning' : 'success',
    },
    {
      icon: Droplet,
      condition: sensorData.waterPurity < 60,
      goodMessage: t('actions.waterPurityGood'),
      badMessage: t('actions.waterPurityLow'),
      type: sensorData.waterPurity < 60 ? 'warning' : 'success',
    },
    {
      icon: Sprout,
      condition: sensorData.soilMoisture < 50,
      goodMessage: t('actions.soilGood'),
      badMessage: t('actions.soilDry'),
      type: sensorData.soilMoisture < 50 ? 'warning' : 'success',
    },
    {
      icon: Leaf,
      condition: sensorData.biodiversity < 60,
      goodMessage: t('actions.biodiversityGood'),
      badMessage: t('actions.biodiversityLow'),
      type: sensorData.biodiversity < 60 ? 'warning' : 'success',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">{t('actions.title')}</h2>
        <p className="text-muted-foreground mt-2">{t('actions.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          const message = action.condition ? action.badMessage : action.goodMessage;
          const isWarning = action.type === 'warning';

          return (
            <Card
              key={index}
              className={`gradient-card p-6 border-2 transition-all duration-300 hover:scale-105 ${
                isWarning
                  ? 'border-warning/50 hover:border-warning'
                  : 'border-success/50 hover:border-success'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-xl ${
                    isWarning ? 'bg-warning/10' : 'bg-success/10'
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      isWarning ? 'text-warning' : 'text-success'
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start gap-2">
                    {isWarning ? (
                      <AlertCircle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    )}
                    <p className="text-sm text-foreground leading-relaxed">{message}</p>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default EcoActions;
