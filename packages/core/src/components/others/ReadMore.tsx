import React, { useCallback, useState, ReactNode } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import { useOverride, useMemoStyles } from '@react-native-cask-ui/theme';

const fixedStyles = StyleSheet.create({
  hidden: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    opacity: 0,
  },
  footer: {
    flexDirection: 'row',
  },
});

const defaultStyles = StyleSheet.create({
  toggleText: {
    paddingTop: 4,
  },
});

export type ReadMoreProps = {
  numberOfLines: number;
  showMoreText: string;
  showLessText: string;
  children: ReactNode;
};

export default React.memo<ReadMoreProps>(props => {
  const { props: overridedProps, styles } = useOverride('ReadMore', props);
  const { numberOfLines, showMoreText, showLessText, children } = overridedProps;

  const [showMore, setShowMore] = useState(false);
  const [collapsedTextHeight, setCollapsedTextHeight] = useState(0);
  const [fullTextHeight, setFullTextHeight] = useState(0);

  const finalToggleTextStyle = useMemoStyles([defaultStyles.toggleText, styles.toggleText]);

  const handleCollapsedTextLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setCollapsedTextHeight(height);
  }, []);

  const handleFullTextLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setFullTextHeight(height);
  }, []);

  const handleToggle = useCallback(() => {
    setShowMore(!showMore);
  }, [showMore]);

  const tooManyText = collapsedTextHeight < fullTextHeight;
  const displayFullText = showMore || !tooManyText;

  return (
    <View>
      <View
        style={displayFullText ? fixedStyles.hidden : undefined}
        pointerEvents={displayFullText ? 'none' : undefined}
        onLayout={handleCollapsedTextLayout}
      >
        <Text numberOfLines={numberOfLines}>{children}</Text>
      </View>
      <View
        style={!displayFullText ? fixedStyles.hidden : undefined}
        pointerEvents={!displayFullText ? 'none' : undefined}
        onLayout={handleFullTextLayout}
      >
        <Text>{children}</Text>
      </View>
      {tooManyText && (
        <View style={fixedStyles.footer}>
          <TouchableOpacity onPress={handleToggle}>
            <Text style={finalToggleTextStyle}>{!showMore ? showMoreText : showLessText}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
});
