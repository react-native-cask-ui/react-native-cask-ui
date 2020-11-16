import { StyleSheet } from 'react-native';
import { Overrides } from '@react-native-cask-ui/theme';

import palette from './palette';

const overrides: Overrides<unknown> = {
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
          backgroundColor: palette.primaryColor,
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
          color: palette.primaryColor,
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
  Card: {
    default: {
      styles: StyleSheet.create({
        root: {
          borderRadius: 6,
          shadowRadius: 6,
          shadowOpacity: 0.6,
          width: 300,
        },
        card: {
          borderRadius: 6,
          padding: 16,
        },
      }),
    },
  },
  Image: {
    default: {
      props: {
        retryable: true,
        placeholderType: 'loader',
        progressColor: palette.primaryColor,
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
          paddingHorizontal: 24,
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
      }),
    },
  },
  ListItem: {
    default: {
      props: {
        accessoryIconColor: palette.primaryColor,
      },
      styles: StyleSheet.create({
        root: {
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
  },
  Text: {
    h1: {
      styles: StyleSheet.create({
        text: {
          display: 'flex',
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
          display: 'flex',
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
          display: 'flex',
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
          backgroundColor: palette.primaryColor,
        },
      }),
    },
    bottomBar: {
      styles: StyleSheet.create({
        root: {
          backgroundColor: 'white',
        },
        inner: {
          backgroundColor: palette.primaryColor,
        },
      }),
    },
  },
};

export default overrides;
