import { useAppStore } from "../state/store";

const useDailyCheckIn = () => {
  const {
    streakCount,
    lastCheckInDate,
    checkInToday,
    showCheckInModal,
    checkIn,
    resetStreak,
    closeModal,
  } = useAppStore();

  const handleCheckIn = () => {
    if (!checkInToday) {
      checkIn();
    }
  };

  const getNextCheckInDate = () => {
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);
    return nextDate.toLocaleDateString();
  };

  return {
    streakCount,
    lastCheckInDate,
    checkInToday,
    showCheckInModal,
    handleCheckIn,
    resetStreak,
    closeModal,
    getNextCheckInDate,
  };
};

export default useDailyCheckIn;