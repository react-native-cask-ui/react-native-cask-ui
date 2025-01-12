import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { useOverride, useMemoStyles } from '@react-native-cask-ui/theme';

const defaultStyles = StyleSheet.create({
  root: {
    flexGrow: 1,
    backgroundColor: '#ddd',
    width: StyleSheet.hairlineWidth,
    height: StyleSheet.hairlineWidth,
  },
  label: {
    color: 'white',
    paddingHorizontal: 8,
  },
});

const fixedStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export type SeparatorProps = {
  variant?: string;
  label?: string;
  vertical?: boolean;
};

export default React.memo<SeparatorProps>(props => {
  const { props: overridedProps, styles } = useOverride('Separator', props);
  const { label, vertical } = overridedProps;

  const finalStyle = useMemoStyles([
    defaultStyles.root,
    styles.root,
    vertical ? { height: undefined } : { width: undefined },
  ]);
  const finalLabelStyle = useMemoStyles([defaultStyles.label, styles.label]);

  if (label) {
    return (
      <View style={vertical ? fixedStyles.column : fixedStyles.row}>
        <View style={finalStyle} />
        <Text style={finalLabelStyle}>{label}</Text>
        <View style={finalStyle} />
      </View>
    );
  }
  return (
    <View style={vertical ? fixedStyles.column : fixedStyles.row}>
      <View style={finalStyle} />
    </View>
  );
});
