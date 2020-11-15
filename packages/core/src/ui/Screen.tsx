import React, { ReactNode, useMemo } from 'react';
import { StyleSheet, View, StatusBar, StatusBarStyle } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
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

export interface ScreenProps {
  variant?: string;
  padding?: boolean;
  topSafe?: boolean;
  bottomSafe?: boolean;
  statusBar?: {
    barStyle?: StatusBarStyle;
    networkActivityIndicatorVisible?: boolean;
    showHideTransition?: 'fade' | 'slide';
    backgroundColor?: string;
    translucent?: boolean;
    animated?: boolean;
    hidden?: boolean;
  };
  children: ReactNode;
}

export default React.memo<ScreenProps>(props => {
  const { props: overridedProps, styles } = useOverride('Screen', props);
  const { padding, topSafe, bottomSafe, statusBar: statusBarProps, children } = overridedProps;

  const finalStyle = useMemoStyles([defaultStyles.root, styles.root]);
  const finalSafeAreaStyle = useMemoStyles([defaultStyles.safeArea, styles.safeArea]);
  const finalInnerStyle = useMemoStyles([defaultStyles.inner, styles.inner, padding ? defaultStyles.padding : {}]);

  const forceInset = useMemo(() => {
    const top: 'always' | 'never' = topSafe ? 'always' : 'never';
    const bottom: 'always' | 'never' = bottomSafe ? 'always' : 'never';
    return { top, bottom };
  }, [topSafe, bottomSafe]);

  return (
    <View style={finalStyle}>
      <SafeAreaView forceInset={forceInset} style={finalSafeAreaStyle}>
        <View style={finalInnerStyle}>{children}</View>
      </SafeAreaView>
      <StatusBar {...statusBarProps} />
    </View>
  );
});
