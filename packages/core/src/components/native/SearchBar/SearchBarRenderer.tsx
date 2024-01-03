import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useOverride, useMemoStyles } from '@react-native-cask-ui/theme';

import { TSearchBarRendererProps } from './types';

const defaultStyles = StyleSheet.create({
  root: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    flex: 1,
    borderRadius: 2,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  input: {
    color: 'black',
    fontSize: 17,
    flex: 1,
    marginHorizontal: 20,
  },
  cancelButton: {
    fontSize: 17,
    paddingLeft: 8,
    color: '#0079FF',
  },
  cancelButtonDisabled: {
    opacity: 0.7,
  },
});

const fixedStyles = StyleSheet.create({
  iconWrapper: {
    width: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo<TSearchBarRendererProps>(props => {
  const { props: overridedProps, styles } = useOverride<TSearchBarRendererProps>('SearchBar', props);
  const {
    placeholderTextColor = '#8b8b8b',
    searchIconColor = '#777777',
    clearIconColor = '#777777',
    value,
    placeholder,
    autoCorrect,
    autoCapitalize,
    autoFocus,
    keyboardType,
    onChangeText,
    onClear,
    onBlur,
    onFocus,
    testID,
  } = overridedProps;

  const finalStyle = useMemoStyles([defaultStyles.root, styles.root]);
  const finalInputContainerStyle = useMemoStyles([defaultStyles.inputContainer, styles.inputContainer]);
  const finalInputStyle = useMemoStyles([defaultStyles.input, styles.input]);

  const [focus, setFocus] = useState(false);

  const handleFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocus(true);
      if (onFocus) onFocus(e);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocus(false);
      if (onBlur) onBlur(e);
    },
    [onBlur],
  );

  // render
  return (
    <View style={finalStyle}>
      <View style={finalInputContainerStyle}>
        <View style={fixedStyles.iconWrapper}>
          {focus ? (
            // TODO: should handle back event
            // <Ionicons name="md-arrow-back" size={23} color={searchIconColor} />
            <Ionicons name="md-search" size={23} color={searchIconColor} />
          ) : (
            <Ionicons name="md-search" size={23} color={searchIconColor} />
          )}
        </View>
        <TextInput
          style={finalInputStyle}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={value}
          onChangeText={onChangeText}
          onBlur={handleBlur}
          onFocus={handleFocus}
          autoCorrect={autoCorrect}
          autoCapitalize={autoCapitalize}
          autoFocus={autoFocus}
          keyboardType={keyboardType}
          testID={testID}
        />
        {!!value && (
          <TouchableOpacity onPress={onClear}>
            <Ionicons name="md-close" size={23} color={clearIconColor} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
});
