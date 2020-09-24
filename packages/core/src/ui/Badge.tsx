import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { useOverride, useMemoStyles, TColor } from '../theme';

const defaultStyles = StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
  badge: {
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

export interface BadgeProps {
  /**
   * The variant to use.
   */
  variant?: string;
  /**
   * The color the badge backgroud.
   */
  color?: TColor;
  /**
   * The text on the badge.
   */
  children: string;
}

const Badge: React.FC<BadgeProps> = React.memo<BadgeProps>(props => {
  const { props: overridedProps, styles } = useOverride('Badge', props);
  const { color, children } = overridedProps;

  const finalStyle = useMemoStyles([defaultStyles.root, styles.root]);
  const finalBadgeStyle = useMemoStyles([defaultStyles.badge, styles.badge, color ? { backgroundColor: color } : null]);
  const finalTextStyle = useMemoStyles([defaultStyles.text, styles.text]);

  return (
    <View style={finalStyle}>
      <View style={finalBadgeStyle}>
        <Text style={finalTextStyle}>{children}</Text>
      </View>
    </View>
  );
});

Badge.defaultProps = {};

export default Badge;
