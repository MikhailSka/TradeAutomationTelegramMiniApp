import { useContext } from 'react';
import { TelegramContext } from '../context/Telegram/TelegramContext';

const useTelegram = () => {
  const tg = useContext(TelegramContext);

  const onToggleButton = () => {
    if (tg) {
      if (tg.MainButton.isVisible) {
        tg.MainButton.hide();
      } else {
        tg.MainButton.show();
      }
    }
  };

  return {
    tg,
    onToggleButton,
  };
};

export default useTelegram;