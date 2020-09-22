import React, { useContext, useEffect, useRef, useMemo, ReactNode } from 'react';
/* @ts-ignore */
import { shallowEqualObjects } from 'shallow-equal';

import { TStyle, TOverride, TTheme } from './types';

const defaultThemeResult: TTheme = {
  name: '',
  palette: {},
  overrides: {},
  extra: {},
};

const ThemeContext = React.createContext<TTheme>(defaultThemeResult);

type ThemeProviderProps = {
  theme: TTheme;
  children: ReactNode;
};

export const ThemeProvider = React.memo<ThemeProviderProps>(({ theme, children }) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
));

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

  const { props: defaultOverridedProps, styles: defaultOverridedStyles } = useMemo(
    () => overrides?.[componentName]?.default || {},
    [overrides, componentName],
  );
  const { props: variantOverridedProps, styles: variantOverridedStyles } = useMemo(
    () => overrides?.[componentName]?.[variant] || {},
    [overrides, componentName, variant],
  );

  // combine default and variant overrides
  const overridedProps = useMemo(() => {
    if (variant === 'default') return defaultOverridedProps;
    return { ...defaultOverridedProps, ...variantOverridedProps };
  }, [defaultOverridedProps, variantOverridedProps]);

  const overridedStyles = useMemo(() => {
    if (variant === 'default') return defaultOverridedStyles;

    const styleKeys = [
      // @ts-ignore
      ...new Set([...Object.keys(defaultOverridedStyles || {}), ...Object.keys(variantOverridedStyles || {})]),
    ];
    return styleKeys.reduce<{ [key: string]: TStyle }>((result, key) => {
      result[key] = [defaultOverridedStyles?.[key], variantOverridedStyles?.[key]];
      return result;
    }, {});
  }, [defaultOverridedStyles, variantOverridedStyles]);

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
