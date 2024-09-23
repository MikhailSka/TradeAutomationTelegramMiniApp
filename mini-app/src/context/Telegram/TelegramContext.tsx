import React from 'react';
import { TelegramWebApp } from '../../types/telegram-web-app';

export const TelegramContext = React.createContext<TelegramWebApp | null>(null);
