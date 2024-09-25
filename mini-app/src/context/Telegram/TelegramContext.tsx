import React from 'react';
import { TelegramWebApp } from '../../models/TelegramWebApp';

export const TelegramContext = React.createContext<TelegramWebApp | null>(null);
