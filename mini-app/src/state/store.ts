
import create from 'zustand';
import { TelegramWebAppThemeParams } from '../types/telegram-web-app';

interface Task {
  id: number;
  title: string;
  points: number;
  isComplete: boolean;
  platform: string;
}

interface Friend {
  id: number;
  name: string;
  invitedFriendsCount: number;
  totalPoints: number;
}

interface AppState {
  username: string;
  points: number;
  farmingStartTime: number | null;
  claimStartTime: number | null;
  pointsFromReferrals: number;
  tasks: Task[];
  friends: Friend[];
  telegramData: string | null;
  themeParams: TelegramWebAppThemeParams | null;
  colorScheme: 'light' | 'dark'; // Added colorScheme
  setUsername: (username: string) => void;
  setPoints: (points: number) => void;
  startFarming: () => void;
  resetFarming: () => void;
  markTaskComplete: (id: number) => void;
  collectFarmingPoints: () => void;
  collectReferralPoints: () => void;
  resetClaimStartTime: () => void;
  setTelegramData: (data: string) => void;
  setThemeParams: (params: TelegramWebAppThemeParams) => void;
  setColorScheme: (scheme: 'light' | 'dark') => void; // Added setter
}

export const useAppStore = create<AppState>((set) => ({
  username: 'User',
  points: 0,
  farmingStartTime: null,
  claimStartTime: null,
  pointsFromReferrals: 1000,

  tasks: [
    { id: 1, title: 'Follow us on Twitter', points: 50, isComplete: false, platform: 'Twitter' },
    { id: 2, title: 'Watch our YouTube video', points: 100, isComplete: false, platform: 'YouTube' },
  ],

  friends: [
    { id: 1, name: 'Alice', invitedFriendsCount: 5, totalPoints: 500 },
    { id: 2, name: 'Bob', invitedFriendsCount: 3, totalPoints: 300 },
  ],

  telegramData: null,
  themeParams: null,
  colorScheme: 'dark', // Default to dark

  setUsername: (username) => set({ username }),

  setPoints: (points) => set((state) => ({ points: state.points + points })),

  startFarming: () => set({ farmingStartTime: Date.now() }),

  resetFarming: () => set({ farmingStartTime: null }),

  markTaskComplete: (id) =>
    set((state) => {
      const tasks = state.tasks.map((task) =>
        task.id === id ? { ...task, isComplete: true } : task
      );
      const completedTask = state.tasks.find((task) => task.id === id && !task.isComplete);
      if (completedTask) {
        return { tasks, points: state.points + completedTask.points };
      }
      return { tasks };
    }),

  collectFarmingPoints: () =>
    set((state) => ({
      points: state.points + 50,
      farmingStartTime: null,
    })),

  collectReferralPoints: () =>
    set((state) => ({
      points: state.points + state.pointsFromReferrals,
      pointsFromReferrals: 0,
    })),

  resetClaimStartTime: () => set({ claimStartTime: Date.now() }),

  setTelegramData: (data) => set({ telegramData: data }),

  setThemeParams: (params) => set({ themeParams: params }),

  setColorScheme: (scheme) => set({ colorScheme: scheme }), // Setter for colorScheme
}));