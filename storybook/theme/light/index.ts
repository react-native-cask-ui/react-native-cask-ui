import { TTheme } from '@react-native-cask-ui/core';

import palette from './palette';
import overrides from './overrides';

const theme: TTheme = {
  name: 'light',
  palette,
  overrides,

  extra: {
    defaultNavigationOptions: {
      headerTintColor: palette.navigationBarItemTintColor,
      headerTitleStyle: {
        color: palette.navigationBarItemColor,
      },
      headerStyle: {
        elevation: 0,
        shadowColor: 'rgba(255, 255, 255, 0.2)',
        shadowRadius: 0,
        shadowOffset: {
          height: 1,
        },
        borderBottomColor: palette.navigationBarBorderColor,
        backgroundColor: palette.navigationBarColor,
      },
    },
    transparentNavigationOptions: {
      headerTransparent: true,
      headerTintColor: 'white',
      headerStyle: {
        elevation: 0,
        borderBottomColor: 'transparent',
        backgroundColor: 'transparent',
      },
    },
    noUnderlineNavigationOptions: {
      headerTintColor: palette.navigationBarItemTintColor,
      headerTitleStyle: {
        color: palette.navigationBarItemColor,
      },
      headerStyle: {
        elevation: 0,
        shadowRadius: 0,
        shadowOffset: {
          height: 0,
        },
        borderBottomWidth: 0,
        backgroundColor: palette.navigationBarColor,
      },
    },
  },
};

export default theme;
