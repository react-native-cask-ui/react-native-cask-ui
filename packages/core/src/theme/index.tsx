import React, { useContext, useEffect, useRef, useMemo } from 'react';
/* @ts-ignore */
import { shallowEqualObjects } from 'shallow-equal';

import { TStyle, TOverride, TTheme } from './types';

const defaultThemeResult: TTheme = {
  name: '',
  palette: {},
  overrides: {},
  extra: {},
};

export const ThemeContext = React.createContext<TTheme>(defaultThemeResult);

const usePrevious = (value: any) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

const useMemoObject = (object: any) => {
  const prevObject = usePrevious(object);
  return object === prevObject || shallowEqualObjects(object, prevObject) ? prevObject : object;
};

export const useTheme = (): TTheme => {
  return useContext(ThemeContext);
};

export const useOverride = <TProps extends { [key: string]: any }>(
  componentName: string,
  props: TProps & { style?: TStyle; variant?: string },
): TOverride<TProps> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant = 'default', style, ...newOtherProps } = props || {};
  const otherProps = useMemoObject(newOtherProps);

  const theme = useTheme();
  const { overrides } = theme;

  const override = useMemo(() => overrides?.[componentName]?.[variant] || {}, [overrides, componentName, variant]);
  let { props: newOverridedProps, styles: newOverridedStyles } = override;

  // combine default and variant overrides
  if (variant !== 'default') {
    const defaultOverride = overrides?.[componentName]?.default || {};
    newOverridedProps = { ...defaultOverride.props, ...newOverridedProps };

    const styleKeys = [...Object.keys(defaultOverride.styles || {}), ...Object.keys(newOverridedStyles || {})];
    newOverridedStyles = styleKeys.reduce((result, key) => {
      /* @ts-ignore */
      result[key] = { ...(defaultOverride.styles?.[key] || {}), ...(newOverridedStyles?.[key] || {}) };
      return result;
    }, {});
  }

  const overridedProps = useMemoObject(newOverridedProps);
  const overridedStyles = useMemoObject(newOverridedStyles);

  const finalProps = useMemo(() => ({ ...overridedProps, ...otherProps }), [overridedProps, otherProps]);
  const finalStyles = useMemo(() => overridedStyles || {}, [overridedStyles]);

  return {
    /* @ts-ignore */
    props: finalProps,
    styles: finalStyles,
  };
};

export const useMemoStyles = (styles: TStyle[]): TStyle => useMemo<TStyle>(() => styles, styles);

export * from './types';
