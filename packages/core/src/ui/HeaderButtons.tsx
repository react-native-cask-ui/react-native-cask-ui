import React, { ComponentType, ReactNode, ReactElement, useCallback } from 'react';
import {
  HeaderButtons as OriginalHeaderButtons,
  HeaderButton as OriginalHeaderButton,
  HeaderItemProps,
} from 'react-navigation-header-buttons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import { useOverride } from '../theme';

export type HeaderButtonsItemProps = {
  variant?: string;
  title: string;
  iconName?: string;
  iconAliases?: {
    [key: string]: string;
  };
  show?: string;
  onPress?: () => void;
  IconComponent?: ReactNode;
  ButtonElement?: ReactElement;
  testID?: string;
};

const HeaderButtonsItem = React.memo<HeaderButtonsItemProps>(props => {
  const { props: overridedProps } = useOverride('HeaderButtons', props);
  const { iconName, iconAliases, IconComponent = EvilIcons, onPress, ...otherProps } = overridedProps;
  const newIconName = iconName ? iconAliases?.[iconName] || iconName : undefined;

  return (
    <OriginalHeaderButton
      iconName={newIconName}
      IconComponent={IconComponent}
      onPress={onPress}
      buttonStyle={{ opacity: onPress ? 1 : 0.3 }}
      {...otherProps}
    />
  );
});

export type HeaderButtonsProps = {
  variant?: string;
  children: ReactNode;
};

const HeaderButtons = React.memo<HeaderButtonsProps>(props => {
  const { variant, children } = props;

  const renderHeaderButton = useCallback((itemProps: HeaderButtonsItemProps) => {
    return <HeaderButtonsItem variant={variant} {...itemProps} />;
  }, []);

  return <OriginalHeaderButtons HeaderButtonComponent={renderHeaderButton}>{children}</OriginalHeaderButtons>;
});

const HeaderButtonsWithStatic = HeaderButtons as React.NamedExoticComponent<HeaderButtonsProps> & {
  Item: ComponentType<HeaderItemProps>;
};

HeaderButtonsWithStatic.Item = OriginalHeaderButtons.Item;

export default HeaderButtonsWithStatic;
