import { $Diff } from 'utility-types';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput as OriginTextInput,
  TextInputProps as OriginTextInputProps,
} from 'react-native';

import { useOverride, useMemoStyles } from '../theme';

const defaultStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    lineHeight: 19,
    paddingHorizontal: 8,
  },
  textInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    lineHeight: 21,
    paddingHorizontal: 12,
    color: 'black',
  },
  textInputDisabled: {},
});

export type TextInputProps = $Diff<OriginTextInputProps, { style?: unknown; children?: unknown }> & {
  variant?: string;
  label?: string;
  disabled?: boolean;
};

export default React.memo<TextInputProps>(props => {
  const { props: overridedProps, styles } = useOverride('TextInput', props);
  const { label, disabled, ...otherProps } = overridedProps;

  const finalStyle = useMemoStyles([defaultStyles.root, styles.root]);
  const finalLabelStyle = useMemoStyles([defaultStyles.label, styles.label]);
  const finalTextInputDisabledStyle = useMemoStyles([defaultStyles.textInputDisabled, styles.textInputDisabled]);
  const finalTextInputStyle = useMemoStyles([
    defaultStyles.textInput,
    styles.textInput,
    disabled ? finalTextInputDisabledStyle : null,
  ]);

  return (
    <View style={finalStyle}>
      {label && <Text style={finalLabelStyle}>{label}</Text>}
      <OriginTextInput placeholderTextColor="#00000033" style={finalTextInputStyle} {...otherProps} />
    </View>
  );
});
