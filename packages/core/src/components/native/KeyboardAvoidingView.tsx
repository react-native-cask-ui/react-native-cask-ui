import React, { ReactNode, useState, useEffect } from 'react';
import { View, Keyboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type KeyboardAvoidingViewProps = {
  bottomSafe?: boolean;
  children: ReactNode;
};

export default React.memo<KeyboardAvoidingViewProps>(props => {
  const { bottomSafe, children } = props;

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardWillShow', e => {
      setKeyboardHeight(e.endCoordinates.height - (bottomSafe ? insets.bottom : 0));
    });
    return () => keyboardShowListener.remove();
  }, [bottomSafe, insets]);

  useEffect(() => {
    const keyboardHideListener = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardHeight(0);
    });
    return () => keyboardHideListener.remove();
  }, []);

  // render
  return <View style={{ flex: 1, marginBottom: keyboardHeight }}>{children}</View>;
});
