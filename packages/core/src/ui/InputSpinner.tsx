import React, { useMemo, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import { useOverride, useMemoStyles } from '../theme';

const defaultStyles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 1,
  },
  buttonDisabled: {
    opacity: 0.3,
  },
  text: {
    fontSize: 15,
    fontVariant: ['tabular-nums'],
    lineHeight: 20,
    fontWeight: 'bold',
    marginHorizontal: 12,
  },
});

type Option = {
  title: string;
  value: any;
};

export type TInputSpinnerProps = {
  // eslint-disable-next-line react/no-unused-prop-types
  variant?: string;
  options: Array<Option>;
  value: any;
  onValueChange: (value: any) => void;
};

export default React.memo<TInputSpinnerProps>(props => {
  const { props: overridedProps, styles } = useOverride('InputSpinner', props);
  const { options, value, iconColor, onValueChange } = overridedProps;

  const valueIndex = useMemo(() => options.map(option => option.value).indexOf(value), [options, value]);

  const handleDecrease = useCallback(() => {
    if (onValueChange && valueIndex > 0) {
      onValueChange(options[valueIndex - 1].value);
    }
  }, [options, onValueChange, valueIndex]);

  const handleIncrease = useCallback((): void => {
    if (onValueChange && valueIndex < options.length - 1) {
      onValueChange(options[valueIndex + 1].value);
    }
  }, [options, onValueChange, valueIndex]);

  const finalStyle = useMemoStyles([defaultStyles.root, styles.root]);
  const finalTextStyle = useMemoStyles([defaultStyles.text, styles.text]);
  const finalButtonStyle = useMemoStyles([defaultStyles.button, styles.button]);
  const finalButtonDisabledStyle = useMemoStyles([defaultStyles.buttonDisabled, styles.buttonDisabled]);

  const leftDisabled = valueIndex === 0;
  const rightDisabled = valueIndex === options.length - 1;
  const finalLeftButtonDisabledStyle = leftDisabled ? finalButtonDisabledStyle : null;
  const finalRightButtonDisabledStyle = rightDisabled ? finalButtonDisabledStyle : null;

  const finalCombinedLeftButtonStyle = useMemoStyles([finalButtonStyle, finalLeftButtonDisabledStyle]);
  const finalCombinedRightButtonStyle = useMemoStyles([finalButtonStyle, finalRightButtonDisabledStyle]);

  return (
    <View style={finalStyle}>
      <TouchableOpacity onPress={handleDecrease} disabled={leftDisabled}>
        <View style={finalCombinedLeftButtonStyle}>
          {/* @ts-ignore */}
          <EvilIcons name="chevron-left" size={28} color={iconColor} />
        </View>
      </TouchableOpacity>
      <Text style={finalTextStyle}>{options[valueIndex].title}</Text>
      <TouchableOpacity onPress={handleIncrease} disabled={rightDisabled}>
        <View style={finalCombinedRightButtonStyle}>
          {/* @ts-ignore */}
          <EvilIcons name="chevron-right" size={28} color={iconColor} />
        </View>
      </TouchableOpacity>
    </View>
  );
});
