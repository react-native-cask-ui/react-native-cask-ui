import React, { useState, useEffect } from 'react';
import { View, Keyboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { KeyboardAvoidingViewProps } from './types';

export default React.memo<KeyboardAvoidingViewProps>(props => {
  const { children } = props;
  const insets = useSafeAreaInsets();

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardWillShow', e => {
      setKeyboardHeight(e.endCoordinates.height - insets.bottom);
    });
    return () => keyboardShowListener.remove();
  }, []);

  useEffect(() => {
    const keyboardHideListener = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardHeight(0);
    });
    return () => keyboardHideListener.remove();
  }, []);

  // render
  return <View style={{ flex: 1, marginBottom: keyboardHeight }}>{children}</View>;
});
