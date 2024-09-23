import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useAppStore } from './state/store';
import createMuiTheme from './utils/createMuiTheme';

// import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

import Home from './pages/Home/Home';
import Tasks from './pages/Tasks/Tasks';
import Friends from './pages/Friends/Friends';

const App: React.FC = () => {
  const themeParams = useAppStore((state) => state.themeParams);
  const colorScheme = useAppStore((state) => state.colorScheme);

  const theme = createMuiTheme(themeParams || {}, colorScheme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router basename="/">
        {/* Optionally include Header */}
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/friends" element={<Friends />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;