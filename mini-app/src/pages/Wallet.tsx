import React from 'react';
import { Typography, Button } from '@mui/material';

const Wallet: React.FC = () => {
  return (
    <div>
      <Typography variant="h4">Wallet</Typography>
      <Button variant="contained" color="secondary">
        View Wallet
      </Button>
    </div>
  );
};

export default Wallet;
