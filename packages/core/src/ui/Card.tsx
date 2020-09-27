import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { useOverride, useMemoStyles } from '../theme';

const defaultStyles = StyleSheet.create({
  root: {
    borderRadius: 4,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: 'rgb(192, 192, 192)',
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'visible',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 4,
    overflow: 'hidden',
  },
});

export interface CardProps {
  /**
   * The variant to use.
   */
  variant?: string;
  /**
   * Anything inside the card.
   */
  children: ReactNode;
}

export default React.memo<CardProps>(props => {
  const { props: overridedProps, styles } = useOverride('Card', props);
  const { children } = overridedProps;

  const finalStyle = useMemoStyles([defaultStyles.root, styles.root]);
  const finalCardStyle = useMemoStyles([defaultStyles.card, styles.card]);

  return (
    <View style={finalStyle}>
      <View style={finalCardStyle}>{children}</View>
    </View>
  );
});
