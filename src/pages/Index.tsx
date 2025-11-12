import React from 'react';
import { Zap, Wind, Droplet, Sprout, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SensorCard from '@/components/SensorCard';
import PlanetHealthBar from '@/components/PlanetHealthBar';
import EcoActions from '@/components/EcoActions';
import SettingsPanel from '@/components/SettingsPanel';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useSensorData } from '@/hooks/useSensorData';

const IndexContent = () => {
  const { t } = useLanguage();
  const { sensorData, planetHealth } = useSensorData();

  const getSensorStatus = (value: number): 'excellent' | 'good' | 'moderate' | 'poor' | 'critical' => {
    if (value >= 80) return 'excellent';
    if (value >= 60) return 'good';
    if (value >= 40) return 'moderate';
    if (value >= 20) return 'poor';
    return 'critical';
  };

  const getStatusLabel = (value: number): string => {
    const status = getSensorStatus(value);
    return t(`sensors.status.${status}`);
  };

  const scrollToMonitoring = () => {
    document.getElementById('monitoring')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center gradient-mesh overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--eco-pulse)/0.1),transparent_50%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="absolute top-8 right-8">
            <SettingsPanel />
          </div>

          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="relative">
                <Zap className="w-20 h-20 text-primary animate-pulse-slow" />
                <div className="absolute inset-0 blur-xl bg-primary/30 animate-pulse" />
              </div>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold text-foreground">
              EcoPulse
            </h1>

            <p className="text-3xl md:text-4xl font-light text-primary animate-pulse-slow">
              {t('hero.tagline')}
            </p>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>

            <Button 
              size="lg" 
              className="text-lg px-8 py-6 pulse-glow"
              onClick={scrollToMonitoring}
            >
              {t('hero.cta')}
            </Button>
          </div>
        </div>
      </section>

      {/* Monitoring Dashboard */}
      <section id="monitoring" className="py-20 px-4">
        <div className="container mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              {t('sensors.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SensorCard
              title={t('sensors.airQuality')}
              icon={<Wind className="w-6 h-6" />}
              value={sensorData.airQuality}
              unit="%"
              metric1Label={t('sensors.co2')}
              metric1Value={sensorData.airCO2}
              metric2Label={t('sensors.pm25')}
              metric2Value={sensorData.airPM25}
              status={getSensorStatus(sensorData.airQuality)}
              statusLabel={getStatusLabel(sensorData.airQuality)}
            />

            <SensorCard
              title={t('sensors.waterPurity')}
              icon={<Droplet className="w-6 h-6" />}
              value={sensorData.waterPurity}
              unit="%"
              metric1Label={t('sensors.ph')}
              metric1Value={sensorData.waterPH}
              metric2Label={t('sensors.turbidity')}
              metric2Value={sensorData.waterTurbidity}
              status={getSensorStatus(sensorData.waterPurity)}
              statusLabel={getStatusLabel(sensorData.waterPurity)}
            />

            <SensorCard
              title={t('sensors.soilMoisture')}
              icon={<Sprout className="w-6 h-6" />}
              value={sensorData.soilMoisture}
              unit="%"
              metric1Label={t('sensors.moisture')}
              metric1Value={sensorData.soilMoisture}
              metric2Label="Temp"
              metric2Value={22}
              status={getSensorStatus(sensorData.soilMoisture)}
              statusLabel={getStatusLabel(sensorData.soilMoisture)}
            />

            <SensorCard
              title={t('sensors.biodiversity')}
              icon={<Leaf className="w-6 h-6" />}
              value={sensorData.biodiversity}
              unit="Index"
              metric1Label={t('sensors.species')}
              metric1Value={Math.floor(sensorData.biodiversity * 1.5)}
              metric2Label="Trend"
              metric2Value={sensorData.biodiversity > 70 ? 5 : -2}
              status={getSensorStatus(sensorData.biodiversity)}
              statusLabel={getStatusLabel(sensorData.biodiversity)}
            />
          </div>

          <PlanetHealthBar health={planetHealth} />

          <EcoActions sensorData={sensorData} />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>EcoPulse — Monitoring the planet's digital heartbeat</p>
        </div>
      </footer>
    </div>
  );
};

const Index = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <IndexContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default Index;
