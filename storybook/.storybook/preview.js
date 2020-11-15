import React from 'react';
import { ThemeProvider } from '@react-native-cask-ui/theme';

import { themes } from '../theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { expanded: true },
};

export const decorators = [
  Story => (
    <ThemeProvider theme={themes.light}>
      <Story />
    </ThemeProvider>
  ),
];
