import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { useOverride, useMemoStyles } from '@react-native-cask-ui/theme';

import { LoadingSpinnerRendererProps } from './types';

const defaultStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toast: {
    backgroundColor: '#00000015',
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
    lineHeight: 20,
    marginTop: 12,
  },
});

export default React.memo<LoadingSpinnerRendererProps>(props => {
  const { props: overridedProps, styles } = useOverride('LoadingSpinner', props);
  const { color, size = 'large', hidden, text } = overridedProps;

  const finalOverlayStyle = useMemoStyles([defaultStyles.overlay, styles.overlay]);
  const finalToastStyle = useMemoStyles([defaultStyles.toast, styles.toast]);
  const finalTextStyle = useMemoStyles([defaultStyles.text, styles.text]);

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents={hidden ? 'none' : 'auto'}>
      {!hidden && (
        <View style={finalOverlayStyle}>
          <View style={finalToastStyle}>
            <ActivityIndicator color={color} size={size} />
            {text && <Text style={finalTextStyle}>{text}</Text>}
          </View>
        </View>
      )}
    </View>
  );
});
