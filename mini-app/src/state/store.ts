import create from 'zustand';

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
  setUsername: (username: string) => void;
  setPoints: (points: number) => void;
  startFarming: () => void;
  resetFarming: () => void;
  markTaskComplete: (id: number) => void;
  collectFarmingPoints: () => void;
  collectReferralPoints: () => void;
  resetClaimStartTime: () => void; 
}

export const useAppStore = create<AppState>((set) => ({
  username: 'Mike_1878',
  points: 0,
  farmingStartTime: null,  // No farming initially
  claimStartTime: null,    // No claim initially
  pointsFromReferrals: 889,  // Example referral points

  tasks: [
    { id: 1, title: 'Backing from Binance', points: 111, isComplete: false, platform: 'Twitter' },
    { id: 2, title: 'Forks Explained', points: 250, isComplete: false, platform: 'YouTube' },
    { id: 3, title: 'TON Voices Live', points: 250, isComplete: true, platform: 'YouTube' },
    { id: 4, title: 'What\'s DAO?', points: 250, isComplete: true, platform: 'YouTube' },
  ],

  friends: [
    { id: 1, name: 'Marooned1988', invitedFriendsCount: 10, totalPoints: 168666 },
    { id: 2, name: 'donnval2', invitedFriendsCount: 7, totalPoints: 119968 },
    { id: 3, name: 'imarchenko013', invitedFriendsCount: 1, totalPoints: 85132 },
  ],

  // Set the username
  setUsername: (username: string) => set({ username }),

  // Add points to the total
  setPoints: (points: number) => set((state) => ({
    points: state.points + points,
  })),

  // Start farming and record the start time
  startFarming: () => set({ farmingStartTime: Date.now() }),

  // Reset farming start time
  resetFarming: () => set({ farmingStartTime: null }),

  // Mark a specific task as complete and add points
  markTaskComplete: (id: number) => set((state) => {
    const task = state.tasks.find((task) => task.id === id);
    if (task && !task.isComplete) {
      task.isComplete = true;
      return {
        tasks: [...state.tasks],
        points: state.points + task.points,
      };
    }
    return state; 
  }),

  // Function to collect farming points after farming is completed
  collectFarmingPoints: () => set((state) => ({
    points: state.points + 50,  // Add 50 points when farming is complete
    farmingStartTime: null,     // Reset farming start time after collecting points
  })),

  // Function to collect referral points
  collectReferralPoints: () => set((state) => ({
    points: state.points + state.pointsFromReferrals,  // Add referral points to total points
    pointsFromReferrals: 0,  // Reset referral points after claiming
  })),

  // Function to reset the claim start time for collecting referral points
  resetClaimStartTime: () => set({ claimStartTime: Date.now() }), 
}));
