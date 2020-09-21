import { StyleProp, ViewStyle, TextStyle, ImageStyle } from 'react-native';

export type TColor = string;

export type TStyle = StyleProp<ViewStyle> | StyleProp<TextStyle> | StyleProp<ImageStyle>;

export type TPalette = {
  [colorName: string]: TColor;
};

export type TOverride<TProps> = {
  props: TProps & {
    [propName: string]: unknown;
  };
  styles: {
    [styleName: string]: TStyle;
  };
};

export type TOverrideConfig<TProps> = {
  props?: TProps & {
    [propName: string]: unknown;
  };
  styles?: {
    [styleName: string]: TStyle;
  };
};

export type TOverrideConfigs<TProps> = {
  [componentName: string]: {
    [variantName: string]: TOverrideConfig<TProps>;
  };
};

export type TTheme = {
  name: string;
  palette: TPalette;
  overrides: TOverrideConfigs<unknown>;
  extra: {
    [key: string]: unknown;
  };
};
