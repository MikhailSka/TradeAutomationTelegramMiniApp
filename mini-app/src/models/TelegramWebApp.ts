export interface TelegramWebAppThemeParams {
    background_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
    secondary_background_color?: string;
  }
  
  export interface TelegramWebAppUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    photo_url?: string;
  }
  
  export interface TelegramWebApp {
    initData?: string;
    initDataUnsafe?: {
      query_id?: string;
      user?: TelegramWebAppUser;
      receiver?: any;
      start_param?: string;
      can_send_after?: number;
      auth_date?: number;
      hash?: string;
    };
    version: string;
    platform: string;
    colorScheme: 'light' | 'dark';
    themeParams: TelegramWebAppThemeParams;
    isExpanded: boolean;
    viewportHeight: number;
    viewportStableHeight: number;
    headerColor: string;
    backgroundColor: string;
    isClosingConfirmationEnabled: boolean;
    MainButton: {
      isVisible: boolean;
      isProgressVisible: boolean;
      isActive: boolean;
      text: string;
      color: string;
      textColor: string;
      setText(text: string): void;
      onClick(callback: () => void): void;
      offClick(callback: () => void): void;
      show(): void;
      hide(): void;
      enable(): void;
      disable(): void;
      showProgress(leaveActive?: boolean): void;
      hideProgress(): void;
      setParams(params: {
        is_visible?: boolean;
        is_active?: boolean;
        is_progress_visible?: boolean;
        text?: string;
        color?: string;
        text_color?: string;
      }): void;
    };
    HapticFeedback: {
      impactOccurred(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): void;
      notificationOccurred(type: 'error' | 'success' | 'warning'): void;
      selectionChanged(): void;
    };
    openTelegramLink(url: string): void;
    openInvoice(url: string, callback?: (status: boolean) => void): void;
    close(): void;
    ready(): void;
    expand(): void;
    onEvent(eventType: string, callback: (...args: any[]) => void): void;
    offEvent(eventType: string, callback: (...args: any[]) => void): void;
    sendData(data: string): void;
  }
  