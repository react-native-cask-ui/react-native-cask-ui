import { Alert, AlertButton } from 'react-native';

export type TAlertAction = {
  text?: string;
  onPress?: () => void | Promise<void>;
  style?: 'default' | 'cancel' | 'destructive';
};

export type TConfirmActions = {
  positive?: {
    text?: string;
    onPress?: () => void | Promise<void>;
    style?: 'default' | 'cancel' | 'destructive';
  };
  negative?: {
    text?: string;
    onPress?: () => void | Promise<void>;
  };
};

export type TChooseActions = {
  options: Array<{
    text?: string;
    onPress?: () => void | Promise<void>;
    style?: 'default' | 'cancel' | 'destructive';
  }>;
  cancel?: {
    text?: string;
  };
};

const alert = (title: string, message?: string | null, action?: TAlertAction): void => {
  Alert.alert(title, message || undefined, action ? [action] : undefined, { cancelable: false });
};

const confirm = (title: string, message?: string | null, actions?: TConfirmActions): void => {
  const { positive, negative } = actions || {};

  Alert.alert(
    title,
    message || undefined,
    [
      {
        text: negative?.text,
        onPress: negative?.onPress,
        style: 'cancel',
      },
      {
        text: positive?.text,
        onPress: positive?.onPress,
        style: positive?.style,
      },
    ],
    { cancelable: false },
  );
};

const choose = (title: string, message?: string | null, actions?: TChooseActions): void => {
  const { options = [], cancel } = actions || {};
  const buttons: AlertButton[] = cancel
    ? [
        {
          text: cancel?.text,
          onPress: () => {
            /* do nothing */
          },
          style: 'cancel',
        },
      ]
    : [];

  Alert.alert(title, message || undefined, [...buttons, ...options], { cancelable: false });
};

export default {
  alert,
  confirm,
  choose,
};
