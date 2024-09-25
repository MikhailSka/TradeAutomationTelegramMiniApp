import { StateCreator } from 'zustand';
import { TelegramWebAppThemeParams } from '../../models/TelegramWebApp';

export interface ThemeState {
  themeParams: TelegramWebAppThemeParams | null;
  colorScheme: 'light' | 'dark';
  setThemeParams: (params: TelegramWebAppThemeParams) => void;
  setColorScheme: (scheme: 'light' | 'dark') => void;
}

export const createThemeSlice: StateCreator<any, [], [], ThemeState> = (set) => ({
  themeParams: null,
  colorScheme: 'dark',

  setThemeParams: (params: TelegramWebAppThemeParams) => set({ themeParams: params }),

  setColorScheme: (scheme: 'light' | 'dark') => set({ colorScheme: scheme }),
});