import React, { ReactNode, ComponentType, useCallback } from 'react';
import {
  StyleSheet,
  Platform,
  View,
  Image,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  TouchableNativeFeedback,
  GestureResponderEvent,
  KeyboardTypeOptions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useOverride, useMemoStyles, TColor } from '@react-native-cask-ui/theme';

import DisclosureIndicator from '../svg/DisclosureIndicator';

type ItemType = 'default' | 'button' | 'input'; // more: picker, datepicker
type AccessoryType = 'none' | 'disclosureIndicator' | 'checkmark';

const PLACEHOLDER_TEXT_COLOR = '#999';

const defaultStyles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 16,
    minHeight: 44,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 29,
    height: 29,
    resizeMode: 'contain',
  },
  iconDisabled: {
    opacity: 0.3,
  },
  text: {
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 16,
    lineHeight: 21,
  },
  textDisabled: {
    opacity: 0.6,
  },
  detailText: {
    paddingTop: 4,
    paddingBottom: 12,
    fontSize: 13,
    lineHeight: 18,
  },
  DetailTextDisabled: {
    opacity: 0.6,
  },
  value: {
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 16,
    lineHeight: 21,
    textAlign: 'right',
  },
  valueDisabled: {
    opacity: 0.6,
  },
  switch: {},
  switchDisabled: {
    opacity: 0.6,
  },
  button: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 16,
    lineHeight: 21,
    textAlign: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  input: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 16,
    lineHeight: 21,
    textAlign: 'right',
    color: 'black',
  },
  inputDisabled: {
    opacity: 0.6,
  },
});

const fixedStyle = StyleSheet.create({
  noPadding: {
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
  },
});

export type ListItemProps = {
  variant?: string;
  // props
  onPress?: (e: GestureResponderEvent, extra: any) => void;
  disabled?: boolean;
  children?: ReactNode;
  // image
  icon?: ReactNode;
  iconView?: ComponentType<unknown>;
  // content
  itemType?: ItemType;
  text?: string;
  detailText?: string;
  placeholder?: string;
  inputUnit?: string;
  keyboardType?: KeyboardTypeOptions;
  value?: any;
  onValueChange?: (value: string | boolean) => void;
  // accessory
  accessoryType?: AccessoryType;
  accessoryIconColor?: TColor;
  allowsSelection?: boolean;
  loading?: boolean;
  loadingView?: ReactNode;
  extra?: any;
};

const ListItem = React.memo<ListItemProps>(props => {
  const { props: overridedProps, styles } = useOverride('ListItem', props);
  const {
    itemType,
    allowsSelection = true,
    disabled,
    loading,
    loadingView,
    text,
    onPress,
    extra,
    children,
  } = overridedProps;

  const handlePress = useCallback(
    (e: GestureResponderEvent) => {
      if (onPress) onPress(e, extra);
    },
    [onPress, extra],
  );

  const finalStyle = useMemoStyles([defaultStyles.root, styles.root]);
  const finalButtonDisabledStyle = useMemoStyles([defaultStyles.buttonDisabled, styles.buttonDisabled]);
  const finalButtonStyle = useMemoStyles([
    defaultStyles.button,
    styles.button,
    disabled ? finalButtonDisabledStyle : null,
  ]);

  const finalStyleForButton = useMemoStyles([finalStyle, fixedStyle.noPadding]);

  let innerView = null;
  let touchableView = null;

  if (itemType === 'button') {
    innerView = <Text style={finalButtonStyle}>{text}</Text>;
    touchableView = (
      <View style={finalStyleForButton} pointerEvents="box-only">
        {innerView}
      </View>
    );
  } else {
    // icon
    const imageView = <IconImageView {...props} />;
    // content
    const contentView = children || <ContentView {...props} />;

    // assemble views
    innerView = (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, flexDirection: 'row', opacity: loading ? 0 : 1 }}>
          {imageView}
          {contentView}
        </View>
        {loading && <View style={StyleSheet.absoluteFill}>{loadingView}</View>}
      </View>
    );
    touchableView = (
      <View style={finalStyle} pointerEvents="box-only">
        {innerView}
        <AccessoryView {...props} />
      </View>
    );
  }

  if (allowsSelection) {
    if (Platform.OS === 'ios' || Platform.OS === 'web') {
      return <TouchableOpacity onPress={handlePress}>{touchableView}</TouchableOpacity>;
    }
    return <TouchableNativeFeedback onPress={handlePress}>{touchableView}</TouchableNativeFeedback>;
  }
  return <View style={finalStyle}>{innerView}</View>;
});

const IconImageView = React.memo<ListItemProps>(props => {
  const { props: overridedProps, styles } = useOverride('ListItem', props);
  const { disabled, icon, iconView } = overridedProps;

  if (!icon && !iconView) return null;

  const finalIconDisabledStyle = useMemoStyles([defaultStyles.iconDisabled, styles.iconDisabled]);
  const finalIconStyle = useMemoStyles([defaultStyles.icon, styles.icon, disabled ? finalIconDisabledStyle : null]);

  return (
    <View style={{ alignSelf: 'center' }}>
      {/* @ts-ignore */}
      {iconView || <Image source={icon} style={finalIconStyle} />}
    </View>
  );
});

const ContentView = React.memo<ListItemProps>(props => {
  const { props: overridedProps, styles } = useOverride('ListItem', props);
  const {
    itemType,
    icon,
    iconView,
    accessoryType,
    disabled,
    text,
    detailText,
    placeholder,
    value,
    onValueChange,
    inputUnit,
    keyboardType,
  } = overridedProps;

  // FIXME: find a better way to define margin 16
  const contentMargins = {};
  /* @ts-ignore */
  if (icon || iconView) contentMargins.marginLeft = 16;
  if (
    accessoryType &&
    accessoryType !== 'none' &&
    !(accessoryType === 'disclosureIndicator' && Platform.OS === 'android')
  ) {
    /* @ts-ignore */
    contentMargins.marginRight = 16;
  }

  const finalContentStyle = useMemoStyles([defaultStyles.content, contentMargins, styles.content]);
  const finalTextDisabledStyle = useMemoStyles([defaultStyles.textDisabled, styles.textDisabled]);
  const finalTextStyle = useMemoStyles([defaultStyles.text, styles.text, disabled ? finalTextDisabledStyle : null]);
  const finalDetailTextDisabledStyle = useMemoStyles([defaultStyles.DetailTextDisabled, styles.DetailTextDisabled]);
  const finalDetailTextStyle = useMemoStyles([
    defaultStyles.detailText,
    styles.detailText,
    disabled ? finalDetailTextDisabledStyle : null,
  ]);
  const finalValueDisabledStyle = useMemoStyles([defaultStyles.valueDisabled, styles.valueDisabled]);
  const finalValueStyle = useMemoStyles([defaultStyles.value, styles.value, disabled ? finalValueDisabledStyle : null]);
  const finalSwitchDisabledStyle = useMemoStyles([defaultStyles.switchDisabled, styles.switchDisabled]);
  const finalSwitchStyle = useMemoStyles([
    defaultStyles.switch,
    styles.switch,
    disabled ? finalSwitchDisabledStyle : null,
  ]);
  const finalInputDisabledStyle = useMemoStyles([defaultStyles.inputDisabled, styles.inputDisabled]);
  const finalInputStyle = useMemoStyles([defaultStyles.input, styles.input, disabled ? finalInputDisabledStyle : null]);

  let leftView = null;
  if (detailText) {
    leftView = (
      <>
        <Text style={[finalTextStyle, { paddingBottom: 0 }]}>{text}</Text>
        <Text style={finalDetailTextStyle}>{detailText}</Text>
      </>
    );
  } else {
    leftView = <Text style={finalTextStyle}>{text}</Text>;
  }

  let rightView = null;
  if (typeof value === 'boolean') {
    rightView = <Switch style={finalSwitchStyle} value={value} onValueChange={onValueChange} disabled={disabled} />;
  } else if (itemType === 'input') {
    rightView = (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <TextInput
          style={finalInputStyle}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
          onChangeText={onValueChange}
          editable={!disabled}
          keyboardType={keyboardType}
        />
        <Text style={finalValueStyle}>{inputUnit ? ` ${inputUnit}` : ''}</Text>
      </View>
    );
  } else if (value) {
    rightView = <Text style={finalValueStyle}>{value}</Text>;
  } else if (accessoryType === 'disclosureIndicator' && placeholder) {
    rightView = <Text style={[finalValueStyle, { color: PLACEHOLDER_TEXT_COLOR }]}>{placeholder}</Text>;
  }

  return (
    <View style={finalContentStyle}>
      <View style={{ paddingRight: 8 }}>{leftView}</View>
      <View style={{ flex: 1 }}>{rightView}</View>
    </View>
  );
});

const AccessoryView = React.memo<ListItemProps>(props => {
  const { props: overridedProps } = useOverride('ListItem', props);
  const { accessoryType, accessoryIconColor } = overridedProps;

  switch (accessoryType) {
    case 'none':
      return null;
    case 'disclosureIndicator':
      if (Platform.OS !== 'android') {
        return (
          <View style={{ alignSelf: 'center' }}>
            <DisclosureIndicator />
          </View>
        );
      }

      return null;
    case 'checkmark':
      return (
        <Ionicons
          name="ios-checkmark"
          size={32}
          color={accessoryIconColor}
          style={{ marginTop: 2, marginLeft: 16, alignSelf: 'center' }}
        />
      );
    default:
      return null;
  }
});

export default ListItem;
