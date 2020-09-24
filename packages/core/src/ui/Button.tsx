import React, { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, TouchableOpacityProps } from 'react-native';
import { $Diff } from 'utility-types';

import { useOverride, useMemoStyles } from '../theme';

const defaultStyles = StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
  button: {
    flexDirection: 'row',
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    paddingHorizontal: 16,
  },
  buttonDisabled: {
    opacity: 0.3,
  },
  icon: {},
  iconDisabled: {},
  text: {
    fontSize: 16,
    lineHeight: 21,
  },
  textDisabled: {},
});

export interface ButtonProps extends $Diff<TouchableOpacityProps, { style?: unknown; children?: unknown }> {
  /**
   * The variant to use.
   */
  variant?: string;
  /**
   * The icon beside the button title. Usually be placed on the left side.
   */
  icon?: ReactNode;
  /**
   * The text content of the button.
   */
  title?: string;
  /**
   * If `true`, the buton is disabled.
   */
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = React.memo<ButtonProps>(props => {
  const { props: overridedProps, styles } = useOverride<ButtonProps>('Button', props);
  const { icon, title, disabled, ...otherProps } = overridedProps;

  const finalStyle = useMemoStyles([defaultStyles.root, styles.root]);
  const finalButtonDisabledStyle = useMemoStyles([defaultStyles.buttonDisabled, styles.disabled]);
  const finalButtonStyle = useMemoStyles([
    defaultStyles.button,
    styles.button,
    disabled ? finalButtonDisabledStyle : null,
  ]);
  const finalIconDisabledStyle = useMemoStyles([defaultStyles.iconDisabled, styles.iconDisabled]);
  const finalIconStyle = useMemoStyles([defaultStyles.icon, styles.icon, disabled ? finalIconDisabledStyle : null]);
  const finalTextDisabledStyle = useMemoStyles([defaultStyles.textDisabled, styles.textDisabled]);
  const finalTextStyle = useMemoStyles([defaultStyles.text, styles.text, disabled ? finalTextDisabledStyle : null]);

  // render
  return (
    <View style={finalStyle}>
      <TouchableOpacity disabled={disabled} {...otherProps}>
        <View style={finalButtonStyle}>
          <View style={finalIconStyle}>{icon}</View>
          {icon && title && <View style={{ width: 8 }} />}
          <Text style={finalTextStyle}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
});

Button.defaultProps = {
  disabled: false,
};

export default Button;
