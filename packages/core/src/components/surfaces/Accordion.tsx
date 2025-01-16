import React, { ReactNode } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useOverride, useMemoStyles } from '@react-native-cask-ui/theme';

const defaultStyles = StyleSheet.create({
  root: {
    marginTop: -1,
  },
  title: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderColor: '#ddd',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: 'rgb(192, 192, 192)',
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  titleText: {
    fontSize: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 4,
    overflow: 'hidden',
  },
});

export interface AccordionProps {
  /**
   * The variant to use.
   */
  variant?: string;
  /**
   * The icon beside the title. Usually be placed on the left side.
   */
  icon?: ReactNode;
  /**
   * The title of the accordion.
   */
  title?: string;
  /**
   * If `false`, the accodiong is not able to be expanded.
   */
  expandable?: boolean;
  /**
   * Anything inside the card.
   */
  children: ReactNode;
}

export default React.memo<AccordionProps>(props => {
  const { props: overridedProps, styles } = useOverride('Accordion', props);
  const { title, children } = overridedProps;

  const finalStyle = useMemoStyles([defaultStyles.root, styles.root]);
  const finalTitleStyle = useMemoStyles([defaultStyles.title, styles.title]);
  const finalTitleTextStyle = useMemoStyles([defaultStyles.titleText, styles.titleText]);

  return (
    <View style={finalStyle}>
      <View style={finalTitleStyle}>
        <Text style={finalTitleTextStyle}>{title}</Text>
      </View>
      <View>{children}</View>
    </View>
  );
});
