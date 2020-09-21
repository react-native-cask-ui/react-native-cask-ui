import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { useOverride, TColor } from '../theme';

const defaultStyles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    borderRadius: 24,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: 'bold',
  },
});

export type TBadgeProps = {
  variant?: string;
  color?: TColor;
  children: string;
};

export default React.memo<TBadgeProps>(props => {
  const { color } = props;
  const { styles } = useOverride('Badge', props);
  const finalStyle = [defaultStyles.root, styles.root, color ? { backgroundColor: color } : null];
  const finalTextStyle = [defaultStyles.text, styles.text];

  return (
    <View style={finalStyle}>
      <Text style={finalTextStyle}>{props.children}</Text>
    </View>
  );
});
