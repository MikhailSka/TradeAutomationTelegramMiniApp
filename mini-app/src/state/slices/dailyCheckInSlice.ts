import { StateCreator } from 'zustand';

export interface DailyCheckInState {
  streakCount: number;
  lastCheckInDate: string | null;
  pointsEarned: number;
  checkInToday: boolean;
  showCheckInModal: boolean;
  checkIn: () => void;
  resetStreak: () => void;
  closeModal: () => void;
  setShowCheckInModal: (show: boolean) => void;
}

export const createDailyCheckInSlice: StateCreator<any, [], [], DailyCheckInState> = (set, get) => ({
  streakCount: 1,
  lastCheckInDate: null,
  pointsEarned: 0,
  checkInToday: false,
  showCheckInModal: false,

  checkIn: () => {
    const today = new Date().toISOString().split('T')[0];
    const { lastCheckInDate, streakCount } = get();

    if (lastCheckInDate === today) {
      return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const wasYesterday = lastCheckInDate === yesterday.toISOString().split('T')[0];

    const newStreakCount = wasYesterday ? streakCount + 1 : 1;
    const earnedPoints = 50 + newStreakCount * 5;

    get().addPoints(earnedPoints); // Ensure addPoints exists and is correctly implemented

    set({
      streakCount: newStreakCount,
      lastCheckInDate: today,
      pointsEarned: get().pointsEarned + earnedPoints,
      checkInToday: true,
      showCheckInModal: false,
    });
  },

  resetStreak: () => set({ streakCount: 1, lastCheckInDate: null, checkInToday: false }),

  closeModal: () => set({ showCheckInModal: false }),

  setShowCheckInModal: (show: boolean) => set({ showCheckInModal: show }),
});