import { createTheme, ThemeOptions } from '@mui/material/styles';
import { TelegramWebAppThemeParams } from '../types/telegram-web-app';

const createMuiTheme = (
  themeParams: TelegramWebAppThemeParams,
  colorScheme: 'light' | 'dark'
): ThemeOptions => {
  return createTheme({
    palette: {
      mode: colorScheme,
      background: {
        default: themeParams.background_color || (colorScheme === 'dark' ? '#121212' : '#ffffff'),
        paper: themeParams.secondary_background_color || (colorScheme === 'dark' ? '#1E1E1E' : '#f0f0f0'),
      },
      text: {
        primary: themeParams.text_color || (colorScheme === 'dark' ? '#ffffff' : '#000000'),
        secondary: themeParams.hint_color || (colorScheme === 'dark' ? '#b3b3b3' : '#707070'),
      },
      primary: {
        main: themeParams.button_color || (colorScheme === 'dark' ? '#0088cc' : '#3f51b5'),
        contrastText: themeParams.button_text_color || '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Roboto Mono", "Roboto", "Helvetica", "Arial", sans-serif', // Added Roboto Mono
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          body {
            font-family: 'Roboto Mono', 'Roboto', sans-serif;
          }
        `,
      },
    },
  });
};

export default createMuiTheme;
