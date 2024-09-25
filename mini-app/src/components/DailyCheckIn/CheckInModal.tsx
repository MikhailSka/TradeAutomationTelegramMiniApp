import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import Confetti from '../Animations/Confetti';
import useDailyCheckIn from '../../hooks/useDailyCheckIn';
import useStyles from './CheckInModal.styles';

const CheckInModal: React.FC = () => {
  const classes = useStyles();
  const { streakCount, checkInToday, showCheckInModal, handleCheckIn, closeModal } = useDailyCheckIn();

  return (
    <Modal
      open={showCheckInModal}
      onClose={closeModal}
      className={classes.modal}
    >
      <Box className={classes.modalContent}>
        <Typography variant="h3" className={classes.dayCount}>
          {streakCount} day check-in
        </Typography>

        <Button
          variant="contained"
          className={classes.checkInButton}
          onClick={handleCheckIn}
        >
          Collect Your Reward
        </Button>

        {checkInToday && <Confetti />}

        <Typography className={classes.resetWarning}>
          Come back tomorrow for check-in day {streakCount + 1}.
        </Typography>

        <Typography className={classes.resetWarning}>
          Tip: Skipping a day resets your check-in streak.
        </Typography>
      </Box>
    </Modal>
  );
};

export default CheckInModal;
