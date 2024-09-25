import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { combine } from 'zustand/middleware';

import { createUserSlice, UserState } from './slices/userSlice';
import { createTaskSlice, TaskState } from './slices/taskSlice';
import { createFriendSlice, FriendState } from './slices/friendSlice';
import { createThemeSlice, ThemeState } from './slices/themeSlice';
import { createTelegramSlice, TelegramState } from './slices/telegramSlice';
import { createDailyCheckInSlice, DailyCheckInState } from './slices/dailyCheckInSlice';

export interface AppState
  extends UserState,
    TaskState,
    FriendState,
    ThemeState,
    TelegramState,
    DailyCheckInState {}

export const useAppStore = create<AppState>()(
  devtools(
    combine(
      {}, 
      (set, get, store) => ({
        ...createUserSlice(set, get, store),
        ...createTaskSlice(set, get, store),
        ...createFriendSlice(set, get, store),
        ...createThemeSlice(set, get, store),
        ...createTelegramSlice(set, get, store),
        ...createDailyCheckInSlice(set, get, store),
      })
    )
  )
);
