import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar' | 'system';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  en: {
    hero: {
      tagline: "See the planet breathe.",
      subtitle: "Real-time environmental monitoring through advanced mechatronic systems",
      cta: "Start Monitoring"
    },
    sensors: {
      title: "Live Environmental Data",
      airQuality: "Air Quality",
      waterPurity: "Water Purity",
      soilMoisture: "Soil Moisture",
      biodiversity: "Biodiversity",
      co2: "CO₂",
      pm25: "PM2.5",
      ph: "pH",
      turbidity: "Turbidity",
      moisture: "Moisture",
      species: "Species Count",
      status: {
        excellent: "Excellent",
        good: "Good",
        moderate: "Moderate",
        poor: "Poor",
        critical: "Critical"
      }
    },
    health: {
      title: "Planet Health",
      overall: "Overall Ecosystem Health"
    },
    actions: {
      title: "Eco Actions",
      subtitle: "Based on current sensor readings",
      airQualityLow: "Air quality is low → Reduce vehicle emissions and industrial output",
      airQualityGood: "Air quality is good → Maintain current environmental practices",
      waterPurityLow: "Water purity is concerning → Implement water treatment and reduce pollution",
      waterPurityGood: "Water quality is excellent → Continue water conservation efforts",
      soilDry: "Soil moisture is low → Implement efficient irrigation and drought-resistant crops",
      soilGood: "Soil moisture is optimal → Maintain current agricultural practices",
      biodiversityLow: "Biodiversity is declining → Protect natural habitats and reduce deforestation",
      biodiversityGood: "Biodiversity is thriving → Continue conservation efforts"
    },
    settings: {
      language: "Language",
      theme: "Theme",
      light: "Light",
      dark: "Dark",
      system: "System"
    }
  },
  ar: {
    hero: {
      tagline: "شاهد الكوكب يتنفس.",
      subtitle: "مراقبة بيئية في الوقت الفعلي من خلال أنظمة ميكاترونيكس متقدمة",
      cta: "ابدأ المراقبة"
    },
    sensors: {
      title: "البيانات البيئية المباشرة",
      airQuality: "جودة الهواء",
      waterPurity: "نقاء الماء",
      soilMoisture: "رطوبة التربة",
      biodiversity: "التنوع البيولوجي",
      co2: "ثاني أكسيد الكربون",
      pm25: "الجسيمات الدقيقة",
      ph: "الأس الهيدروجيني",
      turbidity: "العكارة",
      moisture: "الرطوبة",
      species: "عدد الأنواع",
      status: {
        excellent: "ممتاز",
        good: "جيد",
        moderate: "متوسط",
        poor: "ضعيف",
        critical: "حرج"
      }
    },
    health: {
      title: "صحة الكوكب",
      overall: "الصحة الشاملة للنظام البيئي"
    },
    actions: {
      title: "الإجراءات البيئية",
      subtitle: "بناءً على قراءات المستشعرات الحالية",
      airQualityLow: "جودة الهواء منخفضة ← قلل من انبعاثات المركبات والمخرجات الصناعية",
      airQualityGood: "جودة الهواء جيدة ← حافظ على الممارسات البيئية الحالية",
      waterPurityLow: "نقاء الماء مقلق ← نفذ معالجة المياه وقلل التلوث",
      waterPurityGood: "جودة الماء ممتازة ← استمر في جهود الحفاظ على المياه",
      soilDry: "رطوبة التربة منخفضة ← نفذ ري فعال ومحاصيل مقاومة للجفاف",
      soilGood: "رطوبة التربة مثالية ← حافظ على الممارسات الزراعية الحالية",
      biodiversityLow: "التنوع البيولوجي في تراجع ← احمِ الموائل الطبيعية وقلل إزالة الغابات",
      biodiversityGood: "التنوع البيولوجي مزدهر ← استمر في جهود الحفاظ"
    },
    settings: {
      language: "اللغة",
      theme: "المظهر",
      light: "فاتح",
      dark: "داكن",
      system: "النظام"
    }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('language');
    return (stored as Language) || 'system';
  });

  const [effectiveLanguage, setEffectiveLanguage] = useState<'en' | 'ar'>('en');

  useEffect(() => {
    if (language === 'system') {
      const browserLang = navigator.language.toLowerCase();
      setEffectiveLanguage(browserLang.startsWith('ar') ? 'ar' : 'en');
    } else {
      setEffectiveLanguage(language);
    }
  }, [language]);

  useEffect(() => {
    document.documentElement.dir = effectiveLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = effectiveLanguage;
  }, [effectiveLanguage]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[effectiveLanguage];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      isRTL: effectiveLanguage === 'ar' 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
