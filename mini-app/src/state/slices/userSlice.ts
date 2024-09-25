import { StateCreator } from 'zustand';

export interface UserState {
  username: string;
  points: number;
  farmingStartTime: number | null;
  setUsername: (username: string) => void;
  addPoints: (points: number) => void;
  startFarming: () => void;
  collectFarmingPoints: () => void;
}

export const createUserSlice: StateCreator<any, [], [], UserState> = (set) => ({
  username: 'User',
  points: 0,
  farmingStartTime: null,

  setUsername: (username: string) => set({ username }),

  addPoints: (points: number) => set((state: UserState) => ({ points: state.points + points })),

  startFarming: () => set({ farmingStartTime: Date.now() }),

  collectFarmingPoints: () => {
    const earnedPoints = 50;
    set((state: UserState) => ({
      points: state.points + earnedPoints,
      farmingStartTime: null,
    }));
  },
});