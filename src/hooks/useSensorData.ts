import { useState, useEffect } from 'react';

export interface SensorData {
  airQuality: number;
  airCO2: number;
  airPM25: number;
  waterPurity: number;
  waterPH: number;
  waterTurbidity: number;
  soilMoisture: number;
  biodiversity: number;
}

const generateRandomValue = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const useSensorData = () => {
  const [sensorData, setSensorData] = useState<SensorData>({
    airQuality: 75,
    airCO2: 410,
    airPM25: 15,
    waterPurity: 82,
    waterPH: 7.2,
    waterTurbidity: 3,
    soilMoisture: 65,
    biodiversity: 78,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData({
        airQuality: generateRandomValue(50, 95),
        airCO2: generateRandomValue(380, 450),
        airPM25: generateRandomValue(5, 35),
        waterPurity: generateRandomValue(60, 95),
        waterPH: Number((Math.random() * (8.5 - 6.5) + 6.5).toFixed(1)),
        waterTurbidity: generateRandomValue(1, 10),
        soilMoisture: generateRandomValue(40, 85),
        biodiversity: generateRandomValue(55, 90),
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const planetHealth = Math.round(
    (sensorData.airQuality +
      sensorData.waterPurity +
      sensorData.soilMoisture +
      sensorData.biodiversity) /
      4
  );

  return { sensorData, planetHealth };
};
