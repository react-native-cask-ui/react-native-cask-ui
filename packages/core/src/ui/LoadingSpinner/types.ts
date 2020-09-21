import { ComponentType } from 'react';

import { TColor } from '../../theme';

type BaseProps = {
  variant?: string;
  color?: TColor;
  size?: number | 'small' | 'large';
};

export type LoadingSpinnerRendererProps = {
  hidden: boolean;
  text?: string;
} & BaseProps;

export type LoadingSpinnerProps = {
  Renderer?: ComponentType<LoadingSpinnerRendererProps>;
} & BaseProps;
