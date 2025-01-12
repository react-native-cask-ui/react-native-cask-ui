import React, { ReactNode } from 'react';
import { StyleSheet, View, StatusBar, StatusBarStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useOverride, useMemoStyles } from '@react-native-cask-ui/theme';

const defaultStyles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: 'hidden',
  },
  safeArea: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
  padding: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
});

export type ScreenProps = {
  variant?: string;
  padding?: boolean;
  edges?: ('top' | 'right' | 'bottom' | 'left')[];
  statusBar?: {
    barStyle?: StatusBarStyle;
    networkActivityIndicatorVisible?: boolean;
    showHideTransition?: 'fade' | 'slide';
    backgroundColor?: string;
    translucent?: boolean;
    animated?: boolean;
    hidden?: boolean;
  };
  extension?: ReactNode;
  children: ReactNode;
};

export default React.memo<ScreenProps>(props => {
  const { props: overridedProps, styles } = useOverride('Screen', props);
  const { padding, edges = [], statusBar: statusBarProps, extension, children } = overridedProps;

  const finalStyle = useMemoStyles([defaultStyles.root, styles.root]);
  const finalSafeAreaStyle = useMemoStyles([defaultStyles.safeArea, styles.safeArea]);
  const finalInnerStyle = useMemoStyles([defaultStyles.inner, styles.inner, padding ? defaultStyles.padding : {}]);

  return (
    <View style={finalStyle}>
      <SafeAreaView edges={edges} style={finalSafeAreaStyle}>
        <View style={finalInnerStyle}>{children}</View>
      </SafeAreaView>
      {extension}
      <StatusBar {...statusBarProps} />
    </View>
  );
});
