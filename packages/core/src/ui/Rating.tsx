import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useOverride, useMemoStyles } from '../theme';

const defaultStyles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    paddingLeft: 4,
  },
  value: {
    fontSize: 14,
    lineHeight: 19,
  },
  reviews: {
    fontSize: 14,
    lineHeight: 18,
  },
});

export type RatingProps = {
  variant?: string;
  value: number;
  maxValue?: number;
  iconSize?: number;
  activeColor?: string;
  inactiveColor?: string;
  showLabel?: boolean;
  label?: string | ((value: number) => string);
  reviews?: number;
  onChangeValue?: (value: number) => void;
};

export default React.memo<RatingProps>(props => {
  const { props: overridedProps, styles } = useOverride('Rating', props);
  const {
    value,
    reviews,
    maxValue = 5,
    showLabel,
    label = '',
    onChangeValue,
    iconSize,
    activeColor,
    inactiveColor,
  } = overridedProps;

  const finalStyle = useMemoStyles([defaultStyles.root, styles.root]);
  const finalLabeStyle = useMemoStyles([defaultStyles.label, styles.label]);
  const finalValueStyle = useMemoStyles([defaultStyles.value, styles.value]);
  const finalReviewsStyle = useMemoStyles([defaultStyles.reviews, styles.reviews]);

  if (showLabel) {
    return (
      <View style={finalStyle}>
        <Ionicons name="md-star" size={iconSize} color={activeColor} />
        {!!value && (
          <Text style={finalLabeStyle}>
            <Text style={finalValueStyle}>
              {value.toFixed(1)} {label}
            </Text>
            <Text style={finalReviewsStyle}> · {reviews}</Text>
          </Text>
        )}
      </View>
    );
  }

  const intValue = Math.floor(value);
  const decimalValue = value - intValue;

  const stars = [];
  for (let i = 0; i < maxValue; i += 1) {
    let starContent = null;
    if (i === intValue) {
      starContent = (
        <View>
          <Ionicons name="md-star" size={iconSize} color={inactiveColor} />
          <View style={StyleSheet.absoluteFill}>
            <Ionicons name="md-star" size={iconSize} color={activeColor} style={{ width: `${decimalValue * 100}%` }} />
          </View>
        </View>
      );
    } else {
      const color = i < intValue ? activeColor : inactiveColor;
      starContent = <Ionicons name="md-star" size={iconSize} color={color} />;
    }

    stars.push(
      onChangeValue ? (
        <TouchableOpacity key={`${i}`} onPress={() => onChangeValue(i + 1)}>
          {starContent}
        </TouchableOpacity>
      ) : (
        <View key={`${i}`}>{starContent}</View>
      ),
    );
  }

  return <View style={finalStyle}>{stars}</View>;
});
