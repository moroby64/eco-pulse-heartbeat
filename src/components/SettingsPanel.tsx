import React from 'react';
import { Settings, Globe, Moon, Sun, Monitor } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const SettingsPanel: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  const themeIcons = {
    light: Sun,
    dark: Moon,
    system: Monitor,
  };

  const ThemeIcon = themeIcons[theme];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Settings className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>{t('settings.language')}</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setLanguage('en')} className="cursor-pointer">
          <Globe className="w-4 h-4 mr-2" />
          English {language === 'en' && '✓'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('ar')} className="cursor-pointer">
          <Globe className="w-4 h-4 mr-2" />
          العربية {language === 'ar' && '✓'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('system')} className="cursor-pointer">
          <Globe className="w-4 h-4 mr-2" />
          System {language === 'system' && '✓'}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>{t('settings.theme')}</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setTheme('light')} className="cursor-pointer">
          <Sun className="w-4 h-4 mr-2" />
          {t('settings.light')} {theme === 'light' && '✓'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')} className="cursor-pointer">
          <Moon className="w-4 h-4 mr-2" />
          {t('settings.dark')} {theme === 'dark' && '✓'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')} className="cursor-pointer">
          <Monitor className="w-4 h-4 mr-2" />
          {t('settings.system')} {theme === 'system' && '✓'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsPanel;
