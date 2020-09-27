import React, { useState, useEffect } from 'react';
import { View, Keyboard, useWindowDimensions } from 'react-native';
import { getInset } from 'react-native-safe-area-view';

import { KeyboardAvoidingViewProps } from './types';

export default React.memo<KeyboardAvoidingViewProps>(props => {
  const { children } = props;
  const { width, height } = useWindowDimensions();
  const landscape = width > height;

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardWillShow', e => {
      setKeyboardHeight(e.endCoordinates.height - getInset('bottom', landscape));
    });
    return () => keyboardShowListener.remove();
  }, [landscape]);

  useEffect(() => {
    const keyboardHideListener = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardHeight(0);
    });
    return () => keyboardHideListener.remove();
  }, []);

  // render
  return <View style={{ flex: 1, marginBottom: keyboardHeight }}>{children}</View>;
});
