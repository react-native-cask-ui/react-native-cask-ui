import React, { ReactNode, useMemo } from 'react';
import { View, FlexAlignType } from 'react-native';
import { TColor, useMemoStyles } from '@react-native-cask-ui/theme';

type JustifyContentType = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';

export interface FlexProps {
  children: ReactNode;
  row?: boolean;
  around?: boolean;
  between?: boolean;
  evenly?: boolean;
  fill?: boolean;
  hStart?: boolean;
  vStart?: boolean;
  hCenter?: boolean;
  vCenter?: boolean;
  hEnd?: boolean;
  vEnd?: boolean;
  wrap?: boolean;
  backgroundColor?: TColor;
  width?: number | string;
  height?: number | string;
  padding?: number | string;
  paddingTop?: number | string;
  paddingRight?: number | string;
  paddingBottom?: number | string;
  paddingLeft?: number | string;
  paddingVertical?: number | string;
  paddingHorizontal?: number | string;
}

const Flex = React.memo<FlexProps>(props => {
  const {
    children,
    row,
    around,
    between,
    evenly,
    fill,
    hStart,
    vStart,
    hCenter,
    vCenter,
    hEnd,
    vEnd,
    wrap,
    backgroundColor,
    width,
    height,
    padding,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    paddingVertical,
    paddingHorizontal,
  } = props;

  const fillStyle = fill ? { flex: 1 } : {};
  let spread: JustifyContentType = 'flex-start';
  if (around) spread = 'space-around';
  if (between) spread = 'space-between';
  if (evenly) spread = 'space-evenly';

  let justifyContent: JustifyContentType = spread;
  let alignItems: FlexAlignType = 'stretch';

  if (row) {
    // horizontal
    if (hStart) justifyContent = 'flex-start';
    if (hCenter) justifyContent = 'center';
    if (hEnd) justifyContent = 'flex-end';
    if (vStart) alignItems = 'flex-start';
    if (vCenter) alignItems = 'center';
    if (vEnd) alignItems = 'flex-end';
  } else {
    // vertical
    if (vStart) justifyContent = 'flex-start';
    if (vCenter) justifyContent = 'center';
    if (vEnd) justifyContent = 'flex-end';
    if (hStart) alignItems = 'flex-start';
    if (hCenter) alignItems = 'center';
    if (hEnd) alignItems = 'flex-end';
  }

  const flexDirection: 'row' | 'column' = row ? 'row' : 'column';
  const flexWrap: 'wrap' | 'nowrap' = wrap ? 'wrap' : 'nowrap';

  const layoutStyle = useMemo(
    () => ({
      flexDirection,
      justifyContent,
      alignItems,
      flexWrap,
      backgroundColor,
      width,
      height,
      padding,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      paddingVertical,
      paddingHorizontal,
    }),
    [
      flexDirection,
      justifyContent,
      alignItems,
      flexWrap,
      backgroundColor,
      width,
      height,
      padding,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      paddingVertical,
      paddingHorizontal,
    ],
  );

  const finalStyle = useMemoStyles([fillStyle, layoutStyle]);

  return <View style={finalStyle}>{children}</View>;
});

const FlexWithStatic = Flex as React.NamedExoticComponent<FlexProps> & { Row: React.NamedExoticComponent<FlexProps> };

FlexWithStatic.Row = React.memo<FlexProps>(props => {
  const { children, ...otherProps } = props;
  return (
    <Flex {...otherProps} row>
      {children}
    </Flex>
  );
});

export default FlexWithStatic;
