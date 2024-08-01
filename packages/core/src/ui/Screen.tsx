import React, { ReactNode, useMemo } from 'react';
import { StyleSheet, View, StatusBar, StatusBarStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useOverride, useMemoStyles, TStyle } from '@react-native-cask-ui/theme';

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

interface SafeAreaViewProps {
  forceInset: {
    top: 'always' | 'never';
    bottom: 'always' | 'never';
  };
  style?: TStyle;
  children: ReactNode;
}

const SafeAreaView = (props: SafeAreaViewProps) => {
  const { forceInset, style, children } = props;

  const insets = useSafeAreaInsets();

  const safeAreaStyle = {
    marginTop: 0,
    marginBottom: 0,
    marginRight: insets.right,
    marginLeft: insets.left,
  };

  if (forceInset.top === 'always') {
    safeAreaStyle.marginTop = insets.top;
  }

  if (forceInset.bottom === 'always') {
    safeAreaStyle.marginBottom = insets.bottom;
  }

  return <View style={[safeAreaStyle, style]}>{children}</View>;
};

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
  disableStatusBar?: boolean; // when screen in tabs, they all rendered at same time, we should only show the focused one
  children: ReactNode;
}

export default React.memo<ScreenProps>(props => {
  const { props: overridedProps, styles } = useOverride('Screen', props);
  const { padding, topSafe, bottomSafe, statusBar: statusBarProps, children, disableStatusBar } = overridedProps;

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
      {!disableStatusBar && <StatusBar {...statusBarProps} />}
    </View>
  );
});
