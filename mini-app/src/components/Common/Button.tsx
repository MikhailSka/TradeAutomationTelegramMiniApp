import React from 'react';
import MuiButton, { ButtonProps } from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    // Add other common styles here
  },
}));

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  const classes = useStyles();

  return (
    <MuiButton
      {...props}
      className={`${classes.root} ${className}`}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
