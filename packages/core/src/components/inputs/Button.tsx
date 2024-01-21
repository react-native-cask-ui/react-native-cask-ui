import React, { ReactNode } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TouchableOpacityProps,
  ActivityIndicator,
  ColorValue,
} from 'react-native';
import { useOverride, useMemoStyles } from '@react-native-cask-ui/theme';
import { $Diff } from 'utility-types';

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
    overflow: 'hidden',
  },
  buttonDisabled: {
    opacity: 0.3,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
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
   * If `true`, the button is disabled.
   */
  disabled?: boolean;
  /**
   * If `true`, the button shows loading indicator.
   */
  loading?: boolean;
  /**
   * Loading indicator Color
   */
  loadingIndicatorColor?: ColorValue;
  /**
   * Loading indicator Size
   */
  loadingIndicatorSize?: number | 'small' | 'large' | undefined;
}

const Button: React.FC<ButtonProps> = React.memo<ButtonProps>(props => {
  const { props: overridedProps, styles } = useOverride<ButtonProps>('Button', props);
  const {
    icon,
    title,
    disabled,
    loading,
    loadingIndicatorColor = 'white',
    loadingIndicatorSize = 'small',
    ...otherProps
  } = overridedProps;

  const finalStyle = useMemoStyles([defaultStyles.root, styles.root]);
  const finalButtonDisabledStyle = useMemoStyles([defaultStyles.buttonDisabled, styles.disabled]);
  const finalButtonStyle = useMemoStyles([
    defaultStyles.button,
    styles.button,
    disabled ? finalButtonDisabledStyle : null,
  ]);
  const finalLoadingStyle = useMemoStyles([defaultStyles.loading, styles.loading]);
  const finalIconDisabledStyle = useMemoStyles([defaultStyles.iconDisabled, styles.iconDisabled]);
  const finalIconStyle = useMemoStyles([defaultStyles.icon, styles.icon, disabled ? finalIconDisabledStyle : null]);
  const finalTextDisabledStyle = useMemoStyles([defaultStyles.textDisabled, styles.textDisabled]);
  const finalTextStyle = useMemoStyles([defaultStyles.text, styles.text, disabled ? finalTextDisabledStyle : null]);

  // render
  return (
    <View style={finalStyle}>
      <TouchableOpacity disabled={disabled} {...otherProps}>
        <View style={finalButtonStyle}>
          {loading ? (
            <View style={finalLoadingStyle}>
              <ActivityIndicator color={loadingIndicatorColor} size={loadingIndicatorSize} />
            </View>
          ) : (
            <>
              {icon && <View style={finalIconStyle}>{icon}</View>}
              {icon && title && <View style={{ width: 8 }} />}
              {title && <Text style={finalTextStyle}>{title}</Text>}
            </>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
});

export default Button;
