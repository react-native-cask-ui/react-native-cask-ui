import React, { useMemo, ReactNode } from 'react';
import { StyleSheet, Text as OriginText, TextProps as OriginTextProps } from 'react-native';
import { $Diff } from 'utility-types';

import { useOverride } from '../theme';

const defaultStyles = StyleSheet.create({
  text: {},
});

export type TextProps = $Diff<OriginTextProps, { style?: unknown }> & {
  variant?: string;
  textAlign?: 'left' | 'center' | 'right';
  children: ReactNode;
};

export default React.memo<TextProps>(props => {
  const { props: overridedProps, styles } = useOverride('Text', props);
  const { textAlign, children, ...otherProps } = overridedProps;

  // FIX: workaround for multiple lines text on Android
  // https://github.com/facebook/react-native/issues/24837
  // if developer set fontSize without lineHeight.
  // set lineHeight as fontSize + 5 for multiple lines text
  const flattenTextStyles = StyleSheet.flatten(styles.text);
  /* @ts-ignore */
  const { fontSize, lineHeight: customLineHeight } = flattenTextStyles || {};
  const lineHeight = fontSize && !customLineHeight ? fontSize + 5 : undefined;

  const finalTextStyle = useMemo(() => {
    return [defaultStyles.text, styles.text, { lineHeight }, textAlign ? { textAlign } : null];
  }, [styles.text, lineHeight, textAlign]);

  return (
    <OriginText style={finalTextStyle} {...otherProps}>
      {/* @ts-ignore */}
      {children}
    </OriginText>
  );
});
