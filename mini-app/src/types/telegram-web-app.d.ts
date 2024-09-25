import { TelegramWebApp } from '../models/TelegramWebApp';

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}