import React, { ReactNode, useMemo } from 'react';
import { View } from 'react-native';

export interface StackProps {
  /**
   * If `true`, display by the row direction.
   */
  row?: boolean;
  /**
   * If `true`, the box will fill parent.
   */
  fill?: boolean;
  /**
   * The ratio of inner items
   */
  flexes?: number[];
  /**
   * The same spacing size between each item.
   */
  spacing: number;
  /**
   * Items inside the stack.
   */
  children: ReactNode[];
}

const Stack = React.memo<StackProps>(props => {
  const { row, fill, flexes, spacing, children } = props;

  const items = useMemo(
    () =>
      children
        .filter(item => !!item)
        .map((item, index) => {
          const key = `${index}`;
          let flex;
          if (fill) {
            if (!flexes) flex = 1;
            else {
              flex = flexes?.[index] || undefined;
            }
          }
          const flexDirection = row ? 'row' : ('column' as 'row' | 'column');
          const style = {
            flex,
            flexDirection,
            marginTop: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
            [row ? 'marginRight' : 'marginBottom']: index !== children.length - 1 ? spacing : undefined,
          };
          return (
            <View key={key} style={style}>
              {item}
            </View>
          );
        }),
    [row, fill, flexes, spacing, children],
  );

  return <View style={{ flexDirection: row ? 'row' : 'column', flex: fill ? 1 : undefined }}>{items}</View>;
});

const StackWithStatic = Stack as React.NamedExoticComponent<StackProps> & {
  Row: React.NamedExoticComponent<StackProps>;
};

StackWithStatic.Row = React.memo<StackProps>(props => {
  const { children, ...otherProps } = props;
  return (
    <Stack {...otherProps} row>
      {children}
    </Stack>
  );
});

export default StackWithStatic;
