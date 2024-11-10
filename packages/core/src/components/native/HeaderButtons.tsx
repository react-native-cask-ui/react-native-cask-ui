import React, { ComponentType, ReactNode, useCallback } from 'react';
import { View } from 'react-native';
import {
  HeaderButtons as OriginalHeaderButtons,
  HeaderButton as OriginalHeaderButton,
  HeaderButtonProps as OriginalHeaderButtonProps,
  Item,
  HiddenItem,
  OverflowMenu,
  Divider,
} from 'react-navigation-header-buttons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useOverride } from '@react-native-cask-ui/theme';

export type HeaderButtonsProps = {
  variant?: string;
  children: ReactNode;
  iconSize?: number;
  iconAliases?: {
    [key: string]: string;
  };
  color?: string;
  IconComponent?: ComponentType<any>;
};

const HeaderButtons = React.memo<HeaderButtonsProps>(props => {
  const { props: overridedProps, styles } = useOverride('HeaderButtons', props);
  const { iconSize, iconAliases, color, IconComponent = EvilIcons, children } = overridedProps;

  const renderHeaderButton = useCallback(
    (buttonProps: OriginalHeaderButtonProps) => {
      const { iconName, ...otherProps } = buttonProps;
      const newIconName = iconName ? iconAliases?.[iconName] || iconName : undefined;

      return (
        <OriginalHeaderButton
          iconName={newIconName}
          iconSize={iconSize}
          color={color}
          IconComponent={IconComponent}
          {...otherProps}
        />
      );
    },
    [iconSize, iconAliases, color, IconComponent],
  );

  return (
    <View style={styles.root}>
      <OriginalHeaderButtons HeaderButtonComponent={renderHeaderButton}>{children}</OriginalHeaderButtons>
    </View>
  );
});

const HeaderButtonsWithStatic = HeaderButtons as React.NamedExoticComponent<HeaderButtonsProps> & {
  Item: typeof Item;
  HiddenItem: typeof HiddenItem;
  OverflowMenu: typeof OverflowMenu;
  Divider: typeof Divider;
};

HeaderButtonsWithStatic.Item = Item;
HeaderButtonsWithStatic.HiddenItem = HiddenItem;
HeaderButtonsWithStatic.OverflowMenu = OverflowMenu;
HeaderButtonsWithStatic.Divider = Divider;

export default HeaderButtonsWithStatic;
