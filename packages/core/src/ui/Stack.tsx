import React, { ReactNode } from 'react';
import { View } from 'react-native';

type Props = {
  row?: boolean;
  fill?: boolean;
  flexes?: number[];
  spacing: number;
  children: ReactNode[];
};

export default class Stack extends React.PureComponent<Props> {
  /* @ts-ignore */
  static Row: React.NamedExoticComponent<Props> = (props: Props) => {
    const { children, ...otherProps } = props;
    return (
      <Stack {...otherProps} row>
        {children}
      </Stack>
    );
  };

  renderItems = (): ReactNode[] => {
    const { fill, flexes, spacing, children } = this.props;
    return children.map((item, index) => {
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
    });
  };

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  render() {
    const { row, fill } = this.props;

    return (
      <View style={{ flexDirection: row ? 'row' : 'column', flex: fill ? 1 : undefined }}>{this.renderItems()}</View>
    );
  }
}
