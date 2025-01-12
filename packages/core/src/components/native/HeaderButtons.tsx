import React, { ComponentType, ReactNode } from 'react';
import { StyleSheet, View, Text, Pressable, GestureResponderEvent, Platform } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';

import { useOverride, useMemoStyles } from '@react-native-cask-ui/theme';

const fixedStyles = StyleSheet.create({
  androidCloseButton: {
    marginRight: 32,
  },
});

const defaultStyles = StyleSheet.create({
  buttonDisabled: {
    opacity: 0.5,
  },
});

export type HeaderButtonsProps = {
  variant?: string;
  children: ReactNode;
  iconCloseName?: string;
  iconSize?: number;
  titleSize?: number;
  color?: string;
  IconComponent?: ComponentType<any>;
};

export type HeaderButtonsItemProps = {
  close?: boolean;
  iconCloseName?: string;
  iconName?: string;
  iconSize?: number;
  titleSize?: number;
  color?: string;
  title?: string;
  IconComponent?: ComponentType<any>;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
};

const HeaderButtons = React.memo<HeaderButtonsProps>(props => {
  const { props: overridedProps, styles } = useOverride('HeaderButtons', props);
  const { iconCloseName, iconSize, titleSize, color, IconComponent, children } = overridedProps;

  const items = Array.isArray(children) ? children : [children];

  return (
    <View style={styles.root}>
      {items.map((c, index) => {
        return React.cloneElement(c, {
          // eslint-disable-next-line react/no-array-index-key
          key: `${index}`,
          iconCloseName,
          iconSize,
          titleSize,
          color,
          IconComponent,
        });
      })}
    </View>
  );
});

const HeaderButtonsItem = React.memo<HeaderButtonsItemProps>(props => {
  const {
    close,
    iconCloseName = 'close',
    iconName,
    iconSize,
    titleSize = 17,
    color,
    title,
    IconComponent = EvilIcons,
    onPress,
    disabled,
  } = props;

  const buttonStyle = useMemoStyles([
    Platform.OS === 'android' && close ? fixedStyles.androidCloseButton : undefined,
    disabled ? defaultStyles.buttonDisabled : undefined,
  ]);
  const titleStyle = useMemoStyles([{ fontSize: titleSize, color }]);

  const finalIconName = close ? iconCloseName : iconName;

  return (
    <Pressable style={buttonStyle} onPress={onPress} disabled={disabled}>
      {finalIconName ? (
        // @ts-ignore
        <IconComponent name={finalIconName} size={iconSize} color={color} />
      ) : (
        <Text style={titleStyle}>{title}</Text>
      )}
    </Pressable>
  );
});

const HeaderButtonsWithStatic = HeaderButtons as React.NamedExoticComponent<HeaderButtonsProps> & {
  Item: typeof HeaderButtonsItem;
};

HeaderButtonsWithStatic.Item = HeaderButtonsItem;

export default HeaderButtonsWithStatic;
