import { StateCreator } from 'zustand';
import { TelegramWebApp } from '../../models/TelegramWebApp';

export interface TelegramState {
  telegramData: string | null;
  tg: TelegramWebApp | null;
  setTelegramData: (data: string) => void;
  setTelegramWebApp: (tg: TelegramWebApp) => void;
}

export const createTelegramSlice: StateCreator<any, [], [], TelegramState> = (set) => ({
  telegramData: null,
  tg: null,

  setTelegramData: (data: string) => set({ telegramData: data }),

  setTelegramWebApp: (tg: TelegramWebApp) => set({ tg }),
});