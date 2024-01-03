import React, { ReactNode, useMemo } from 'react';
import { View, FlexAlignType, DimensionValue } from 'react-native';
import { TColor, useMemoStyles } from '@react-native-cask-ui/theme';

type JustifyContentType = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';

export interface FlexProps {
  /**
   * Anything inside the flex box.
   */
  children: ReactNode;
  /**
   * If `true`, display by the row direction.
   */
  row?: boolean;
  /**
   * If `true`, the inner items will arranged like `justifyContent: 'space-around'`.
   */
  around?: boolean;
  /**
   * If `true`, the inner items will arranged like `justifyContent: 'space-between'`.
   */
  between?: boolean;
  /**
   * If `true`, the inner items will arranged like `justifyContent: 'space-evenly'`.
   */
  evenly?: boolean;
  /**
   * If `true`, the box will fill parent.
   */
  fill?: boolean;
  /**
   * If `true`, the inner items will be arranged from the start position in the horizontal direction.
   */
  hStart?: boolean;
  /**
   * If `true`, the inner items will be arranged from the start position in the vertical direction.
   */
  vStart?: boolean;
  /**
   * If `true`, the inner items will be arranged in the middle of the horizontal direction.
   */
  hCenter?: boolean;
  /**
   * If `true`, the inner items will be arranged in the middle of the vertical direction.
   */
  vCenter?: boolean;
  /**
   * If `true`, the inner items will be arranged from the end position in the horizontal direction.
   */
  hEnd?: boolean;
  /**
   * If `true`, the inner items will be arranged from the start position in the vertical direction.
   */
  vEnd?: boolean;
  /**
   * If `true`, the inner items will be arranged like `flexWrap: 'wrap'`.
   */
  wrap?: boolean;
  /**
   * The background color of the flex box.
   */
  backgroundColor?: TColor;
  /**
   * The width of the flex box.
   */
  width?: DimensionValue;
  /**
   * The height of the flex box.
   */
  height?: DimensionValue;
  /**
   * The min width of the flex box.
   */
  minWidth?: DimensionValue;
  /**
   * The min height of the flex box.
   */
  minHeight?: DimensionValue;
  /**
   * The paddings of the flex box.
   */
  padding?: DimensionValue;
  /**
   * The padding top of the flex box.
   */
  paddingTop?: DimensionValue;
  /**
   * The padding right of the flex box.
   */
  paddingRight?: DimensionValue;
  /**
   * The padding bottom of the flex box.
   */
  paddingBottom?: DimensionValue;
  /**
   * The padding left of the flex box.
   */
  paddingLeft?: DimensionValue;
  /**
   * The paddings of the flex box in the vertical direction.
   */
  paddingVertical?: DimensionValue;
  /**
   * The paddings of the flex box in the horizontal direction.
   */
  paddingHorizontal?: DimensionValue;
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
    minWidth,
    minHeight,
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
      minWidth,
      minHeight,
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
      minWidth,
      minHeight,
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
