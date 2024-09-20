import React, { useState, useEffect, useRef } from 'react';
import { Button, Typography, Avatar, Box } from '@mui/material';
import { useAppStore } from '../state/store';  // Import the store

const Friends: React.FC = () => {
  const friends = useAppStore((state) => state.friends);  // Get the list of friends from the store
  const claimStartTime = useAppStore((state) => state.claimStartTime);  // Track claim start time
  const collectReferralPoints = useAppStore((state) => state.collectReferralPoints);  // Action to collect referral points
  const pointsFromReferrals = useAppStore((state) => state.pointsFromReferrals);  // Referral points
  const resetClaimStartTime = useAppStore((state) => state.resetClaimStartTime);  // Reset claim timer

  const [timeLeft, setTimeLeft] = useState('8:00:00');  // Initial claim time
  const [claimStatus, setClaimStatus] = useState<'claim' | 'wait'>('claim');

  const intervalRef = useRef<NodeJS.Timeout | null>(null);  // Keep track of the interval

  useEffect(() => {
    const updateClaimTimeLeft = () => {
      if (claimStartTime) {
        const elapsed = Date.now() - claimStartTime;
        const totalClaimTime = 8 * 60 * 60 * 1000;  // 8 hours in milliseconds
        const remaining = totalClaimTime - elapsed;

        if (remaining > 0) {
          const hours = Math.floor(remaining / (1000 * 60 * 60));
          const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
          setTimeLeft(`${hours}h ${minutes.toString().padStart(2, '0')}m`);
          setClaimStatus('wait');  // User needs to wait
        } else {
          setTimeLeft('');
          setClaimStatus('claim');  // User can claim
        }
      }
    };

    // Call immediately to avoid waiting 1 second before showing the correct state
    updateClaimTimeLeft();

    // Clear any previous interval when the component unmounts or before creating a new one
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Set interval for regular updates
    if (claimStartTime) {
      intervalRef.current = setInterval(updateClaimTimeLeft, 1000);  // Update every second
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);  // Cleanup the interval on component unmount
    };
  }, [claimStartTime]);

  // Handle click to claim referral points
  const handleClaimPoints = () => {
    if (claimStatus === 'claim') {
      collectReferralPoints();  // Collect referral points
      resetClaimStartTime();  // Reset the claim timer
      setClaimStatus('wait');  // Set status to wait
    }
  };

  return (
    <Box
      sx={{ padding: '16px', bgcolor: '#121212', color: '#e0e0e0', height: '100vh', position: 'relative' }}
    >
      {/* Header */}
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        Invite Frens
      </Typography>

      {/* Referral Points Section */}
      <Box 
        sx={{ 
          bgcolor: '#1E1E1E', 
          padding: '16px', 
          borderRadius: '8px', 
          textAlign: 'center', 
          mb: 2,
          display: 'flex',    // Center the content horizontally and vertically
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h5">
          ₿ {pointsFromReferrals.toLocaleString()}
        </Typography>

        {/* Single Button with Conditional Text */}
        <Button
  fullWidth
  sx={{
    backgroundColor: claimStatus === 'claim' ? '#28a745' : '#333',  // Color based on claim status
    borderRadius: '30px',
    color: claimStatus === 'wait' ? '#b3b5b3 !important' : '#fff',  // Use #b3b5b3 when disabled, white otherwise
    fontWeight: 'bold',
    height: '50px',
    width: '200px',
    '&:disabled': {
      color: '#b3b5b3',  // Ensuring the color is applied when the button is disabled
    },
    '&:hover': {
      backgroundColor: claimStatus === 'claim' ? '#218838' : '#4e4f4e',  // Different hover for claim and wait states
    },
  }}
  disabled={claimStatus === 'wait'}  // Disable button if waiting for next claim
  onClick={handleClaimPoints}
>
  {claimStatus === 'claim' ? 'Claim' : `Claim in: ${timeLeft}`}
</Button>

      </Box>

      {/* Referral Info */}
      <Typography variant="body2" sx={{ textAlign: 'center', mb: 3 }}>
        Score 10% from buddies + 2.5% from their referrals
      </Typography>

      {/* Friends List */}
      <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
        {friends.length} frens
      </Typography>
      {friends.map((friend) => (
        <Box
          key={friend.id}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{ padding: '12px', borderBottom: '1px solid #333' }}
        >
          {/* Friend Avatar and Name */}
          <Box display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: '#4e4f4e', mr: 2 }}>
              {friend.name.charAt(0).toUpperCase()}  {/* Show first letter of name */}
            </Avatar>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1" noWrap>{friend.name}</Typography>
              <Typography variant="body2" sx={{ color: '#bbb' }}>+ {friend.invitedFriendsCount} frens</Typography>  {/* Number of invited friends */}
            </Box>
          </Box>

          {/* Friend Stats */}
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Typography variant="body2">{friend.totalPoints.toLocaleString()} BP</Typography>
          </Box>
        </Box>
      ))}

      {/* Invite Button positioned like the Farming Button */}
      <Box 
        sx={{ 
            position: 'fixed', 
            bottom: '70px', 
            left: '50%',   // Center horizontally
            transform: 'translateX(-50%)',  // Adjust for exact centering
            width: '85%',   // Set the container's width to 85% to match the Farming Button
            px: 2            // Add padding to create space around the button
        }}
        >
        <Button
            fullWidth  // Makes the button take the full width of its container
            sx={{ 
            height: '50px',
            borderRadius: '10px',  // Set the border radius to round the corners
            color: '#fff',
            borderColor: '#fff',
            backgroundColor: 'transparent',
            border: '2px solid #fff',
            '&:hover': {
                backgroundColor: '#4e4f4e',  // Hover effect
            },
            }}
        >
            Invite a fren
        </Button>
      </Box>
    </Box>
  );
};

export default Friends;
