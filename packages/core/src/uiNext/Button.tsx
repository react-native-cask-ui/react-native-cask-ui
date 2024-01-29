import React, { ReactNode, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, TouchableOpacityProps } from 'react-native';
import { useMemoStyles, useTheme, TStyle } from '@react-native-cask-ui/theme';
import { $Diff } from 'utility-types';

export type TPalette = Record<string, string>;

export type TVariant = 'default' | 'outline' | 'plainText' | 'rounded';

export type TSize = 'small' | 'medium' | 'large';

export type TStyleVariant = {
  root?: TStyle;
  button?: TStyle;
  disabled?: TStyle;
  icon?: TStyle;
  iconDisabled?: TStyle;
  text?: TStyle;
  textDisabled?: TStyle;
};

const getSizeVariant = (size: TSize = 'medium') => {
  return (
    {
      small: StyleSheet.create({
        iconButton: {
          width: 32,
          height: 32,
        },
        button: {
          minHeight: 32,
          paddingHorizontal: 12,
          paddingVertical: 8,
        },
        text: {
          fontSize: 14,
          lineHeight: 16,
        },
      }),
      medium: StyleSheet.create({
        iconButton: {
          width: 40,
          height: 40,
        },
        button: {
          minHeight: 40,
          paddingHorizontal: 16,
          paddingVertical: 8,
        },
        text: {
          fontSize: 16,
          lineHeight: 24,
        },
      }),
      large: StyleSheet.create({
        iconButton: {
          width: 48,
          height: 48,
        },
        button: {
          minHeight: 48,
          paddingHorizontal: 24,
          paddingVertical: 8,
        },
        text: {
          fontSize: 16,
          lineHeight: 24,
        },
      }),
    }?.[size] || {}
  );
};

const getStyleVariant = (palette: TPalette, variant: TVariant = 'default'): TStyleVariant => {
  return (
    {
      default: StyleSheet.create({
        button: {
          backgroundColor: palette.primaryColor,
          borderRadius: 8,
        },
        text: {
          color: palette.colorWhite,
        },
      }),
      outline: StyleSheet.create({
        button: {
          backgroundColor: 'transparent',
          borderColor: palette.colorLightGray,
          borderRadius: 8,
          borderWidth: 2,
        },
        text: {
          color: palette.colorDark,
        },
      }),
      rounded: StyleSheet.create({
        button: {
          backgroundColor: palette.primaryColor,
          borderRadius: 24,
        },
        text: {
          color: palette.colorWhite,
        },
      }),
      plainText: StyleSheet.create({
        button: {},
        text: {
          color: palette.colorDark,
        },
      }),
    }?.[variant] || {}
  );
};

const generalStyles = StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  buttonDisabled: {
    opacity: 0.3,
  },
  icon: {},
  iconDisabled: {},
  text: {
    fontWeight: '500',
  },
  textDisabled: {},
});

export interface ButtonV2Props extends $Diff<TouchableOpacityProps, { style?: unknown; children?: unknown }> {
  /**
   * The variant to use.
   */
  variant?: TVariant;
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
  /**
   * The size of the button.
   */
  size?: TSize;
  /**
   * Override the style of the root element.
   */
  sx?: TStyleVariant;
}

const Button: React.FC<ButtonV2Props> = React.memo<ButtonV2Props>(props => {
  const { variant, icon, title, disabled, size, sx, ...otherProps } = props;
  const { palette } = useTheme();

  const variantStyled = useMemo(() => getStyleVariant(palette, variant), [variant, palette]);
  const sizeVariant = useMemo(() => getSizeVariant(size), [size]);
  const isIconOnly = useMemo(() => !title && !!icon, [title, icon]);

  const ElementRootStyle = useMemoStyles([generalStyles.root, variantStyled.root, sx?.root || {}]);
  const finalButtonDisabledStyle = useMemoStyles([generalStyles.buttonDisabled, variantStyled.disabled, sx?.disabled]);
  const finalButtonStyle = useMemoStyles([
    generalStyles.button,
    variantStyled.button,
    isIconOnly ? sizeVariant.iconButton : sizeVariant.button,
    sx?.button,
    disabled ? finalButtonDisabledStyle : null,
  ]);
  const finalIconDisabledStyle = useMemoStyles([
    generalStyles.iconDisabled,
    variantStyled.iconDisabled,
    sx?.iconDisabled,
  ]);
  const finalIconStyle = useMemoStyles([
    generalStyles.icon,
    variantStyled.icon,
    sx?.icon,
    disabled ? finalIconDisabledStyle : null,
  ]);
  const finalTextDisabledStyle = useMemoStyles([generalStyles.textDisabled, variantStyled.textDisabled]);
  const finalTextStyle = useMemoStyles([
    generalStyles.text,
    variantStyled.text,
    sizeVariant.text,
    sx?.text,
    disabled ? finalTextDisabledStyle : null,
  ]);

  return (
    <View style={ElementRootStyle}>
      <TouchableOpacity disabled={disabled} {...otherProps}>
        <View style={finalButtonStyle}>
          {icon && <View style={finalIconStyle}>{icon}</View>}
          {icon && title && <View style={{ width: 8 }} />}
          {!!title && <Text style={finalTextStyle}>{title}</Text>}
        </View>
      </TouchableOpacity>
    </View>
  );
});

export default Button;
