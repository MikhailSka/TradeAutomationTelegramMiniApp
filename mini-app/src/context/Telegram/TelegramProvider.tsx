import React, { useEffect, useState } from 'react';
import { TelegramContext } from './TelegramContext';
import { TelegramWebApp } from '../../models/TelegramWebApp';
import { useAppStore } from '../../state/store';

interface TelegramProviderProps {
  children: React.ReactNode;
}

const TelegramProvider: React.FC<TelegramProviderProps> = ({ children }) => {
  const [telegramWebApp, setTelegramWebApp] = useState<TelegramWebApp | null>(null);
  const setThemeParams = useAppStore((state) => state.setThemeParams);
  const setColorScheme = useAppStore((state) => state.setColorScheme);
  const setUsername = useAppStore((state) => state.setUsername);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      console.log('Telegram WebApp initialized:', tg);
      setTelegramWebApp(tg);
      tg.ready();

      // Expand the WebApp to full screen
      tg.expand();

      // Set theme params in the store
      if (tg.themeParams) {
        console.log('Received themeParams:', tg.themeParams);
        setThemeParams(tg.themeParams);
      } else {
        console.warn('No themeParams received from Telegram.');
      }

      // Set colorScheme in the store
      if (tg.colorScheme) {
        console.log('Received colorScheme:', tg.colorScheme);
        setColorScheme(tg.colorScheme);
      } else {
        console.warn('No colorScheme received from Telegram.');
      }

      // Set username from Telegram user data
      if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        const user = tg.initDataUnsafe.user;
        const username = user.username
          ? `@${user.username}`
          : `${user.first_name} ${user.last_name || ''}`.trim();
        setUsername(username);
        console.log('Username set:', username);
      } else {
        console.warn('No user data received from Telegram.');
      }

      // Handle theme changes (if Telegram supports dynamic theme updates)
      const handleThemeChange = () => {
        if (tg.themeParams) {
          console.log('ThemeParams updated:', tg.themeParams);
          setThemeParams(tg.themeParams);
        }
        if (tg.colorScheme) {
          console.log('ColorScheme updated:', tg.colorScheme);
          setColorScheme(tg.colorScheme);
        }
      };
      tg.onEvent('themeChanged', handleThemeChange);

      // Cleanup on unmount
      return () => {
        tg.offEvent('themeChanged', handleThemeChange);
      };
    } else {
      console.error('Telegram WebApp is not available.');
    }
  }, [setThemeParams, setColorScheme, setUsername]);

  return (
    <TelegramContext.Provider value={telegramWebApp}>{children}</TelegramContext.Provider>
  );
};

export default TelegramProvider;
