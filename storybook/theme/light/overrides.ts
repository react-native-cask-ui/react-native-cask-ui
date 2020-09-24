import { StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { TOverrideConfigs } from '@react-native-cask-ui/core';

import palette from './palette';

const overrides: TOverrideConfigs<unknown> = {
  Badge: {
    default: {
      props: {
        color: palette.primaryColor,
      },
      styles: StyleSheet.create({
        text: {
          color: 'white',
        },
      }),
    },
    slim: {
      styles: StyleSheet.create({
        badge: {
          borderRadius: 4,
          paddingVertical: 2,
          paddingHorizontal: 8,
          marginRight: 4,
          marginBottom: 4,
        },
        text: {
          fontSize: 13,
        },
      }),
    },
  },
  Button: {
    default: {
      styles: StyleSheet.create({
        root: {
          flexDirection: 'row',
        },
        button: {
          backgroundColor: palette.secondaryColor,
          paddingHorizontal: 24,
          borderRadius: 8,
          height: 38,
        },
        text: {
          color: 'white',
          fontWeight: 'bold',
        },
      }),
    },
    outline: {
      styles: StyleSheet.create({
        button: {
          backgroundColor: 'transparent',
          borderColor: palette.primaryColor,
          borderWidth: 2,
        },
        text: {
          color: palette.primaryDeepColor,
        },
      }),
    },
    rounded: {
      styles: StyleSheet.create({
        button: {
          borderRadius: 22,
        },
      }),
    },
  },
  Text: {
    h1: {
      styles: StyleSheet.create({
        text: {
          color: palette.highlightedTextColor,
          fontSize: 22,
          marginTop: 18,
          marginBottom: 10,
          fontWeight: 'bold',
        },
      }),
    },
    h2: {
      styles: StyleSheet.create({
        text: {
          color: palette.highlightedTextColor,
          fontSize: 20,
          marginTop: 16,
          marginBottom: 10,
          fontWeight: 'bold',
        },
      }),
    },
    h3: {
      styles: StyleSheet.create({
        text: {
          color: palette.highlightedTextColor,
          fontSize: 18,
          marginTop: 14,
          marginBottom: 10,
          fontWeight: 'bold',
        },
      }),
    },
    content: {
      styles: StyleSheet.create({
        text: {
          color: palette.textColor,
          fontSize: 15,
        },
      }),
    },
    deletion: {
      styles: StyleSheet.create({
        text: {
          color: palette.textColor,
          fontSize: 15,
          textDecorationLine: 'line-through',
          textDecorationStyle: 'solid',
        },
      }),
    },
    tip: {
      styles: StyleSheet.create({
        text: {
          color: palette.textColor,
          fontSize: 12,
        },
      }),
    },
  },
  TextInput: {
    default: {
      props: {
        placeholderTextColor: palette.placeholderTextColor,
      },
      styles: StyleSheet.create({
        root: {
          width: 300,
        },
        label: {
          color: palette.highlightedTextColor,
        },
        textInput: {
          color: palette.highlightedTextColor,
          borderWidth: 1,
          borderColor: palette.borderColor,
          borderRadius: 4,
          height: undefined,
          paddingVertical: 8,
        },
        textInputDisabled: {
          backgroundColor: palette.grayColor,
        },
      }),
    },
    underline: {
      styles: StyleSheet.create({
        textInput: {
          borderWidth: 0,
          borderBottomWidth: 1,
          borderRadius: 0,
          paddingVertical: 4,
        },
      }),
    },
  },

  Screen: {
    default: {
      props: {
        statusBar: {
          barStyle: 'light-content',
          // translucent: true
        },
      },
      styles: StyleSheet.create({
        root: {
          backgroundColor: palette.primaryBgColor,
        },
      }),
    },
    bottomBar: {
      styles: StyleSheet.create({
        root: {
          backgroundColor: 'white',
        },
        inner: {
          backgroundColor: palette.primaryBgColor,
        },
      }),
    },
  },
  Card: {
    default: {
      styles: StyleSheet.create({
        root: {
          borderRadius: 6,
          shadowRadius: 6,
          elevation: 12,
        },
        card: {
          borderRadius: 6,
        },
      }),
    },
    searchBar: {
      styles: StyleSheet.create({
        root: {
          shadowOpacity: 0,
          shadowRadius: 0,
          elevation: 0,
        },
      }),
    },
  },

  HeaderButtons: {
    default: {
      props: {
        iconAliases: {
          close: 'x',
        },
        IconComponent: Feather,
        iconSize: 25,
        color: palette.navigationBarItemTintColor,
      },
    },
  },
  Image: {
    default: {
      props: {
        retryable: true,
        placeholderType: 'loader',
        progressColor: palette.secondaryColor,
      },
    },
    circle: {
      styles: StyleSheet.create({
        root: {
          overflow: 'hidden',
          borderRadius: 200,
        },
      }),
    },
    circleOutline: {
      styles: StyleSheet.create({
        root: {
          backgroundColor: 'white',
          borderColor: 'white',
          borderWidth: 3,
          overflow: 'hidden',
          borderRadius: 200,
        },
      }),
    },
    servicePreview: {
      styles: StyleSheet.create({
        root: {
          overflow: 'hidden',
          borderRadius: 4,
        },
      }),
    },
    story: {
      styles: StyleSheet.create({
        root: {
          overflow: 'hidden',
          borderRadius: 8,
        },
      }),
    },
  },
  InputSpinner: {
    default: {
      props: {
        iconColor: palette.textColor,
      },
      styles: StyleSheet.create({
        button: {
          borderColor: palette.textColor,
        },
        text: {
          color: palette.highlightedTextColor,
        },
      }),
    },
  },
  List: {
    default: {
      styles: StyleSheet.create({
        groupedHeaderText: {
          color: palette.textColor,
          paddingHorizontal: 20,
        },
        groupedFooterText: {
          color: palette.textColor,
          paddingHorizontal: 20,
        },
        plainHeaderText: {
          color: palette.highlightedTextColor,
          backgroundColor: '#f9f9f9',
        },
        sectionSeparator: {
          backgroundColor: '#ebebeb',
        },
        itemSeparator: {
          backgroundColor: '#ebebeb',
          marginLeft: 24,
        },
        itemSeparatorInset: {
          backgroundColor: palette.secondaryBgColor,
        },
      }),
    },
  },
  ListItem: {
    default: {
      props: {
        accessoryIconColor: palette.secondaryColor,
      },
      styles: StyleSheet.create({
        root: {
          backgroundColor: palette.secondaryBgColor,
          paddingLeft: 24,
          paddingRight: 24,
        },
        icon: {
          tintColor: palette.highlightedTextColor,
        },
        text: {
          color: palette.highlightedTextColor,
        },
        detailText: {
          color: palette.textColor,
        },
        value: {
          color: palette.textColor,
        },
        button: {
          color: palette.primaryColor,
        },
        accessory: {
          color: palette.primaryColor,
        },
      }),
    },
    check: {
      props: {
        accessoryIconColor: palette.secondaryColor,
      },
    },
    uncheck: {
      props: {
        accessoryIconColor: 'transparent',
      },
    },
    success: {
      styles: StyleSheet.create({
        value: {
          color: palette.successColor,
        },
      }),
    },
    warning: {
      styles: StyleSheet.create({
        value: {
          color: palette.warningColor,
        },
      }),
    },
    danger: {
      styles: StyleSheet.create({
        value: {
          color: palette.dangerColor,
        },
        button: {
          color: palette.dangerColor,
        },
      }),
    },
  },
  LoadingSpinner: {
    default: {
      props: {
        color: palette.secondaryColor,
      },
      styles: StyleSheet.create({
        overlay: {
          backgroundColor: '#00000013',
        },
        toast: {
          backgroundColor: '#ffffffaa',
        },
        text: {
          color: palette.highlightedTextColor,
          fontWeight: 'bold',
        },
      }),
    },
  },
  Pager: {
    default: {
      styles: StyleSheet.create({
        indicator: {
          backgroundColor: palette.secondaryColor,
        },
        tabBar: {
          backgroundColor: palette.primaryBgColor,
        },
        tab: {
          backgroundColor: palette.secondaryBgColor,
        },
        tabLabelActive: {
          color: palette.secondaryColor,
        },
        tabLabelInactive: {
          color: '#9d9d9d',
        },
      }),
    },
    search: {
      styles: StyleSheet.create({
        tabBar: {
          height: 48,
        },
        tab: {
          height: 45,
        },
      }),
    },
  },
  Rating: {
    default: {
      props: {
        inactiveColor: '#ddd',
        activeColor: palette.secondaryColor,
        iconSize: 23,
      },
      styles: StyleSheet.create({
        value: {
          color: palette.secondaryColor,
        },
        reviews: {
          color: palette.textColor,
        },
      }),
    },
    small: {
      props: {
        iconSize: 17,
      },
    },
    big: {
      props: {
        iconSize: 48,
      },
    },
  },
  Modal: {
    default: {
      styles: StyleSheet.create({
        modal: {
          shadowRadius: 6,
          backgroundColor: 'white',
        },
      }),
    },
  },
  ReadMore: {
    default: {
      styles: StyleSheet.create({
        toggleText: {
          color: palette.primaryDeepColor,
          // textDecorationLine: 'underline',
          fontWeight: 'bold',
          fontSize: 14,
        },
      }),
    },
  },
  SearchBar: {
    default: {
      props: {
        placeholderTextColor: palette.placeholderTextColor,
      },
      styles: StyleSheet.create({
        root: {
          paddingHorizontal: 24,
        },
        inputContainer: {
          backgroundColor: 'white',
          paddingVertical: 8,
          paddingHorizontal: 12,
          height: undefined,
        },
        cancelButton: {
          color: 'white',
        },
      }),
    },
  },
  SelectLabel: {
    home: {
      styles: StyleSheet.create({
        label: {
          borderWidth: 0,
        },
        text: {
          color: palette.placeholderTextColor,
          fontSize: 15,
        },
        textActive: {
          color: palette.highlightedTextColor,
        },
      }),
    },
    order: {
      styles: StyleSheet.create({
        label: {
          borderWidth: 0,
          paddingRight: 0,
        },
        text: {
          color: palette.placeholderTextColor,
          fontSize: 15,
          fontWeight: 'bold',
        },
        textActive: {
          color: palette.highlightedTextColor,
        },
      }),
    },
    search: {
      styles: StyleSheet.create({
        label: {
          borderColor: '#aaa',
          backgroundColor: 'white',
          marginRight: 4,
          marginVertical: 2,
        },
        labelActive: {
          borderColor: palette.secondaryDeepColor,
          backgroundColor: palette.secondaryColor,
        },
        text: {
          color: palette.textColor,
          fontSize: 14,
        },
        textActive: {
          color: 'white',
          fontWeight: 'bold',
        },
      }),
    },
  },
  Toolbar: {
    default: {
      styles: StyleSheet.create({
        root: {
          backgroundColor: palette.secondaryBgColor,
          borderColor: palette.tabBarBorderColor,
          paddingHorizontal: 24,
        },
      }),
    },
    option: {
      styles: StyleSheet.create({
        root: {
          justifyContent: 'space-between',
        },
      }),
    },
  },
};

export default overrides;
