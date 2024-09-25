import { StateCreator } from 'zustand';
import { Friend } from '../../models/Friend';

export interface FriendState {
  friends: Friend[];
  pointsFromReferrals: number;
  claimStartTime: number | null;
  collectReferralPoints: () => void;
  resetClaimStartTime: () => void;
}

export const createFriendSlice: StateCreator<any, [], [], FriendState> = (set, get) => ({
  friends: [
    { id: 1, name: 'Alice', invitedFriendsCount: 5, totalPoints: 500 },
    { id: 2, name: 'Bob', invitedFriendsCount: 3, totalPoints: 300 },
  ],
  pointsFromReferrals: 1000,
  claimStartTime: null,

  collectReferralPoints: () => {
    const points = get().pointsFromReferrals;
    get().addPoints(points); // Assuming addPoints is available globally
    set({
      pointsFromReferrals: 0,
      claimStartTime: Date.now(),
    });
  },

  resetClaimStartTime: () => set({ claimStartTime: Date.now() }),
});