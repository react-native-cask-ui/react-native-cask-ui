import React, { useCallback } from 'react';

import SearchBarRenderer from './SearchBarRenderer';

import { TSearchBarProps } from './types';

export default React.memo<TSearchBarProps>(props => {
  const { Renderer = SearchBarRenderer, value, onChangeText, onClear, ...otherProps } = props;

  const handleChangeText = useCallback((text: string) => {
    if (onChangeText) onChangeText(text);
  }, []);

  const handleClear = useCallback(() => {
    if (onChangeText) onChangeText('');
    if (onClear) onClear();
  }, []);

  // render
  return <Renderer {...otherProps} value={value} onChangeText={handleChangeText} onClear={handleClear} />;
});
