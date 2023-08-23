import { $Diff } from 'utility-types';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput as OriginTextInput,
  TextInputProps as OriginTextInputProps,
} from 'react-native';
import { useOverride, useMemoStyles, TColor } from '@react-native-cask-ui/theme';

const defaultStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    lineHeight: 19,
    paddingHorizontal: 8,
    paddingBottom: 4,
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

export interface TextInputProps extends $Diff<OriginTextInputProps, { style?: unknown; children?: unknown }> {
  /**
   * The variant to use.
   */
  variant?: string;
  /**
   * The label above the text input control.
   */
  label?: string;
  /**
   * The value to show for the text input.
   */
  value?: string;
  /**
   * The string that will be rendered before text input has been entered
   */
  placeholder?: string;
  /**
   * The text color of the placeholder string
   */
  placeholderTextColor?: TColor;
  /**
   * If `false`, the text is not editable.
   */
  editable?: boolean;
}

const TextInput = React.forwardRef<OriginTextInput, TextInputProps>((props, ref) => {
  const { props: overridedProps, styles } = useOverride('TextInput', props);
  const { label, editable, ...otherProps } = overridedProps;

  const finalStyle = useMemoStyles([defaultStyles.root, styles.root]);
  const finalLabelStyle = useMemoStyles([defaultStyles.label, styles.label]);
  const finalTextInputDisabledStyle = useMemoStyles([defaultStyles.textInputDisabled, styles.textInputDisabled]);
  const finalTextInputStyle = useMemoStyles([
    defaultStyles.textInput,
    styles.textInput,
    !editable ? finalTextInputDisabledStyle : null,
  ]);

  return (
    <View style={finalStyle}>
      {label && <Text style={finalLabelStyle}>{label}</Text>}
      <OriginTextInput
        ref={ref}
        placeholderTextColor="#00000033"
        style={finalTextInputStyle}
        editable={editable}
        {...otherProps}
      />
    </View>
  );
});

export default React.memo(TextInput);
