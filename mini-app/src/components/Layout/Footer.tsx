import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import TaskIcon from '@mui/icons-material/Assignment';
import GroupsIcon from '@mui/icons-material/Groups';

const Footer: React.FC = () => {
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(_, newValue) => setValue(newValue)}
      showLabels
      style={{ position: 'fixed', bottom: 0, width: '100%' }}
    >
      <BottomNavigationAction component={Link} to="/" label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction component={Link} to="/tasks" label="Tasks" icon={<TaskIcon />} />
      <BottomNavigationAction component={Link} to="/friends" label="Friends" icon={<GroupsIcon />} />
    </BottomNavigation>
  );
};

export default Footer;
