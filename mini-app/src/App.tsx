import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
// import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Groups2Icon from '@mui/icons-material/Groups2';
import TaskIcon from '@mui/icons-material/Assignment';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Friends from './pages/Friends';
// import Wallet from './pages/Wallet';


const App: React.FC = () => {
  const [value, setValue] = useState<number>(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/friends" element={<Friends />} />
        {/* <Route path="/wallet" element={<Wallet />} /> */}
      </Routes>

      <BottomNavigation
        value={value}
        onChange={(event: React.SyntheticEvent, newValue: number) => {
          setValue(newValue);
        }}
        showLabels
        style={{ position: 'fixed', bottom: 0, width: '100%' }}
      >
        <BottomNavigationAction
          component={Link}
          to="/"
          label="Home"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/tasks"
          label="Tasks"
          icon={<TaskIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/friends"
          label="Friends"
          icon={<Groups2Icon />}
        />
        {/* <BottomNavigationAction
          component={Link}
          to="/wallet"
          label="Wallet"
          icon={<AccountBalanceWalletIcon />}
        /> */}
      </BottomNavigation>
    </Router>
  );
};

export default App;
