import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { TSearchBarRendererProps } from './types';
import { useOverride, useMemoStyles } from '../../theme';

const defaultStyles = StyleSheet.create({
  root: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: '#EEE',
    flexDirection: 'row',
    flex: 1,
    height: 34,
    borderRadius: 8,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    flex: 1,
    marginHorizontal: 8,
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

export default React.memo<TSearchBarRendererProps>(props => {
  const { props: overridedProps, styles } = useOverride<TSearchBarRendererProps>('SearchBar', props);
  const {
    placeholderTextColor = '#8E8E92',
    searchIconColor = '#838383',
    clearIconColor = '#838383',
    value,
    placeholder,
    autoCorrect,
    autoCapitalize,
    autoFocus,
    keyboardType,
    cancelButtonTitle,
    cancelDisabled,
    onChangeText,
    onClear,
    onCancel,
    onBlur,
    onFocus,
    testID,
  } = overridedProps;

  const finalStyle = useMemoStyles([defaultStyles.root, styles.root]);
  const finalInputContainerStyle = useMemoStyles([defaultStyles.inputContainer, styles.inputContainer]);
  const finalInputStyle = useMemoStyles([defaultStyles.input, styles.input]);
  const finalCancelButtonDisabledStyle = useMemoStyles([
    defaultStyles.cancelButtonDisabled,
    styles.cancelButtonDisabled,
  ]);
  const finalCancelButtonStyle = useMemoStyles([
    defaultStyles.cancelButton,
    styles.cancelButton,
    cancelDisabled ? finalCancelButtonDisabledStyle : null,
  ]);

  // render
  return (
    <View style={finalStyle}>
      <View style={finalInputContainerStyle}>
        <Ionicons name="ios-search" size={19} color={searchIconColor} />
        <TextInput
          style={finalInputStyle}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          onFocus={onFocus}
          autoCorrect={autoCorrect}
          autoCapitalize={autoCapitalize}
          autoFocus={autoFocus}
          keyboardType={keyboardType}
          testID={testID}
        />
        {!!value && (
          <TouchableOpacity onPress={onClear}>
            <Ionicons name="ios-close-circle" size={19} color={clearIconColor} />
          </TouchableOpacity>
        )}
      </View>
      {cancelButtonTitle && (
        <TouchableOpacity disabled={cancelDisabled} onPress={onCancel}>
          <Text style={finalCancelButtonStyle}>{cancelButtonTitle}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
});
