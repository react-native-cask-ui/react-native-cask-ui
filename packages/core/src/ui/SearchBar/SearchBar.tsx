import React, { useState, useCallback } from 'react';

import SearchBarRenderer from './SearchBarRenderer';

import { TSearchBarProps } from './types';

export default React.memo<TSearchBarProps>(props => {
  const { Renderer = SearchBarRenderer, value: defaultValue, onChangeText, onClear, ...otherProps } = props;
  const [value, setValue] = useState(defaultValue || '');

  const handleChangeText = useCallback((text: string) => {
    if (onChangeText) onChangeText(text);
    setValue(text);
  }, []);

  const handleClear = useCallback(() => {
    if (onClear) onClear();
    setValue('');
  }, []);

  // render
  return <Renderer {...otherProps} value={value} onChangeText={handleChangeText} onClear={handleClear} />;
});
