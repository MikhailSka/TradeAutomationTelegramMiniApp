import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { useAppStore } from '../../state/store';
import Button from '../../components/Common/Button';
import useStyles from './Friends.styles';

const Friends: React.FC = () => {
  const classes = useStyles();

  const friends = useAppStore((state) => state.friends);
  const claimStartTime = useAppStore((state) => state.claimStartTime);
  const collectReferralPoints = useAppStore((state) => state.collectReferralPoints);
  const pointsFromReferrals = useAppStore((state) => state.pointsFromReferrals);
  const resetClaimStartTime = useAppStore((state) => state.resetClaimStartTime);

  const [timeLeft, setTimeLeft] = useState('8:00:00');
  const [claimStatus, setClaimStatus] = useState<'claim' | 'wait'>('claim');

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateClaimTimeLeft = () => {
      if (claimStartTime) {
        const elapsed = Date.now() - claimStartTime;
        const totalClaimTime = 8 * 60 * 60 * 1000; // 8 hours
        const remaining = totalClaimTime - elapsed;

        if (remaining > 0) {
          const hours = Math.floor(remaining / (1000 * 60 * 60));
          const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
          setTimeLeft(`${hours}h ${minutes.toString().padStart(2, '0')}m`);
          setClaimStatus('wait');
        } else {
          setTimeLeft('');
          setClaimStatus('claim');
        }
      }
    };

    updateClaimTimeLeft();

    if (intervalRef.current) clearInterval(intervalRef.current);

    if (claimStartTime) {
      intervalRef.current = setInterval(updateClaimTimeLeft, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [claimStartTime]);

  const handleClaimPoints = () => {
    if (claimStatus === 'claim') {
      collectReferralPoints();
      resetClaimStartTime();
      setClaimStatus('wait');
    }
  };

  return (
    <Box className={classes.root}>
      {/* Header */}
      <Typography variant="h4" gutterBottom>
        Invite Friends
      </Typography>

      {/* Referral Points Section */}
      <Box className={classes.referralPointsSection}>
        <Typography variant="h5">₿ {pointsFromReferrals.toLocaleString()}</Typography>

        <Button
          fullWidth
          disabled={claimStatus === 'wait'}
          onClick={handleClaimPoints}
          className={claimStatus === 'wait' ? classes.claimButtonDisabled : classes.claimButton}
        >
          {claimStatus === 'claim' ? 'Claim' : `Claim in: ${timeLeft}`}
        </Button>
      </Box>

      {/* Referral Info */}
      <Typography variant="body2" sx={{ textAlign: 'center', marginBottom: '1rem' }}>
        Earn 10% from buddies + 2.5% from their referrals
      </Typography>

      {/* Friends List */}
      <Typography variant="h6" sx={{ marginBottom: '1rem' }}>
        {friends.length} friends
      </Typography>
      {friends.map((friend) => (
        <Box key={friend.id} className={classes.friendItem}>
          <Box display="flex" alignItems="center">
            <Avatar sx={{ backgroundColor: '#4e4f4e', marginRight: '8px' }}>
              {friend.name.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="body1" noWrap>
                {friend.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                + {friend.invitedFriendsCount} friends
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="body2">{friend.totalPoints.toLocaleString()} BP</Typography>
          </Box>
        </Box>
      ))}

      {/* Sticky Invite Button */}
      <Box className={classes.bottomSection}>
        <Button fullWidth className={classes.inviteButton}>
          Invite a friend
        </Button>
      </Box>
    </Box>
  );
};

export default Friends;