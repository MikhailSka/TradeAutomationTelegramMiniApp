import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useAppStore } from './state/store';
import createMuiTheme from './utils/createMuiTheme';

import Footer from './components/Layout/Footer';
import Home from './pages/Home/Home';
import Tasks from './pages/Tasks/Tasks';
import Friends from './pages/Friends/Friends';

import CheckInModal from './components/DailyCheckIn/CheckInModal';

const App: React.FC = () => {
  const themeParams = useAppStore((state) => state.themeParams);
  const colorScheme = useAppStore((state) => state.colorScheme);

  const showCheckInModal = useAppStore((state) => state.showCheckInModal);
  const checkInToday = useAppStore((state) => state.checkInToday);
  const setShowCheckInModal = useAppStore((state) => state.setShowCheckInModal);

  const theme = createMuiTheme(themeParams || {}, colorScheme);

  useEffect(() => {
    if (!checkInToday) {
      setShowCheckInModal(true); // Show the modal when the user hasn't checked in today
    }
  }, [checkInToday, setShowCheckInModal]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {showCheckInModal && <CheckInModal />}
      <Router basename="/TradeAutomationTelegramMiniApp/">
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