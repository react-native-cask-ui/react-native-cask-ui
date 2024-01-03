import { ComponentType } from 'react';
import { KeyboardTypeOptions, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

import { TColor } from '@react-native-cask-ui/theme';

type BaseProps = {
  variant?: string;
  value?: string;
  placeholder?: string;
  autoCorrect?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoFocus?: boolean;
  keyboardType?: KeyboardTypeOptions;
  cancelButtonTitle?: string;
  cancelDisabled?: boolean;
  onChangeText?: (text: string) => void;
  onClear?: () => void;
  onCancel?: () => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  testID?: string;
};

export type TSearchBarRendererProps = {
  searchIconColor?: TColor;
  clearIconColor?: TColor;
  cancelButtonTextColor?: TColor;
  placeholderTextColor?: TColor;
} & BaseProps;

export type TSearchBarProps = {
  Renderer?: ComponentType<TSearchBarRendererProps>;
} & BaseProps;
