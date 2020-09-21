import React, { ReactNode, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useOverride, useMemoStyles } from '../theme';

const defaultStyles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    height: 44,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
});

export type ToolbarProps = {
  variant?: string;
  location?: 'top' | 'bottom';
  children: ReactNode;
};

export default React.memo<ToolbarProps>(props => {
  const { props: overridedProps, styles } = useOverride('Toolbar', props);
  const { location = 'bottom', children } = overridedProps;

  const borderStyle = useMemo(
    () => ({
      borderTopWidth: location === 'bottom' ? StyleSheet.hairlineWidth : 0,
      borderBottomWidth: location === 'top' ? StyleSheet.hairlineWidth : 0,
    }),
    [location],
  );

  const finalRootStyle = useMemoStyles([defaultStyles.root, styles.root, borderStyle]);

  return <View style={finalRootStyle}>{children}</View>;
});
