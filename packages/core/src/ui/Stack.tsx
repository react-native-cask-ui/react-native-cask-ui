import React, { ReactNode, useMemo } from 'react';
import { View } from 'react-native';

export interface StackProps {
  row?: boolean;
  fill?: boolean;
  flexes?: number[];
  spacing: number;
  children: ReactNode[];
}

const Stack = React.memo<StackProps>(props => {
  const { row, fill, flexes, spacing, children } = props;

  const items = useMemo(
    () =>
      children.map((item, index) => {
        const key = `${index}`;
        let flex;
        if (fill) {
          if (!flexes) flex = 1;
          else {
            flex = flexes?.[index] || undefined;
          }
        }
        const style = index === children.length - 1 ? { flex } : { flex, marginRight: spacing };
        return (
          <View key={key} style={style}>
            {item}
          </View>
        );
      }),
    [fill, flexes, spacing, children],
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
