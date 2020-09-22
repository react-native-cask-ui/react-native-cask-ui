import { StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { TOverrideConfigs } from '@react-native-cask-ui/core';

import palette from './palette';

const overrides: TOverrideConfigs<unknown> = {
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
  Text: {
    header: {
      styles: StyleSheet.create({
        text: {
          color: palette.highlightedTextColor,
          fontSize: 18,
          marginTop: 12,
          marginBottom: 10,
          fontWeight: 'bold',
        },
      }),
    },
    summary: {
      styles: StyleSheet.create({
        text: {
          color: palette.textColor,
          fontSize: 16,
          marginBottom: 16,
        },
      }),
    },
    title: {
      styles: StyleSheet.create({
        text: {
          color: palette.highlightedTextColor,
          fontSize: 16,
          fontWeight: 'bold',
          fontVariant: ['tabular-nums'],
        },
      }),
    },
    titleDeletion: {
      styles: StyleSheet.create({
        text: {
          color: palette.highlightedTextColor,
          fontSize: 16,
          textDecorationLine: 'line-through',
          textDecorationStyle: 'solid',
        },
      }),
    },
    highlightTitle: {
      styles: StyleSheet.create({
        text: {
          color: palette.primaryDeepColor,
          fontSize: 16,
          fontWeight: 'bold',
        },
      }),
    },
    lowlightTitle: {
      styles: StyleSheet.create({
        text: {
          color: palette.textColor,
          fontSize: 16,
          fontWeight: 'bold',
        },
      }),
    },
    searchBar: {
      styles: StyleSheet.create({
        text: {
          color: palette.placeholderTextColor,
          fontSize: 16,
        },
      }),
    },
    bannerTitle: {
      styles: StyleSheet.create({
        text: {
          color: 'black',
          fontSize: 17,
          fontWeight: 'bold',
          marginBottom: 12,
        },
      }),
    },
    bannerContent: {
      styles: StyleSheet.create({
        text: {
          color: 'black',
          fontSize: 15,
        },
      }),
    },
    rowTitle: {
      styles: StyleSheet.create({
        text: {
          color: palette.highlightedTextColor,
          fontSize: 16,
        },
      }),
    },
    rowSubTitle: {
      styles: StyleSheet.create({
        text: {
          color: palette.highlightedTextColor,
          fontSize: 15,
        },
      }),
    },
    subtitle: {
      styles: StyleSheet.create({
        text: {
          color: palette.highlightedTextColor,
          fontSize: 15,
          fontWeight: 'bold',
        },
      }),
    },
    label: {
      styles: StyleSheet.create({
        text: {
          color: palette.textColor,
          fontSize: 14,
        },
      }),
    },
    content: {
      styles: StyleSheet.create({
        text: {
          color: palette.textColor,
          fontSize: 14,
        },
      }),
    },
    contentDeletion: {
      styles: StyleSheet.create({
        text: {
          color: palette.textColor,
          fontSize: 14,
          textDecorationLine: 'line-through',
          textDecorationStyle: 'solid',
        },
      }),
    },
    highlightContent: {
      styles: StyleSheet.create({
        text: {
          color: palette.highlightedTextColor,
          fontSize: 14,
        },
      }),
    },
    highlightPrimaryContent: {
      styles: StyleSheet.create({
        text: {
          color: palette.primaryDeepColor,
          fontSize: 14,
          fontWeight: 'bold',
        },
      }),
    },
    highlightSecondaryContent: {
      styles: StyleSheet.create({
        text: {
          color: palette.secondaryColor,
          fontSize: 14,
          fontWeight: 'bold',
        },
      }),
    },
    select: {
      styles: StyleSheet.create({
        text: {
          color: palette.highlightedTextColor,
          fontSize: 15,
        },
      }),
    },
    slogan1: {
      styles: StyleSheet.create({
        text: {
          color: 'white',
          fontSize: 24,
          paddingBottom: 12,
          textAlign: 'right',
        },
      }),
    },
    slogan2: {
      styles: StyleSheet.create({
        text: {
          color: 'white',
          fontSize: 32,
          textAlign: 'right',
        },
      }),
    },
    white: {
      styles: StyleSheet.create({
        text: {
          color: 'white',
          fontSize: 14,
        },
      }),
    },
    whiteUnderline: {
      styles: StyleSheet.create({
        text: {
          color: 'white',
          textDecorationLine: 'underline',
          fontSize: 14,
        },
      }),
    },
    navTitle: {
      styles: StyleSheet.create({
        text: {
          color: palette.navigationBarItemColor,
          fontSize: 17,
          fontWeight: 'bold',
        },
      }),
    },
    navSubtitle: {
      styles: StyleSheet.create({
        text: {
          color: palette.navigationBarItemColor,
          fontSize: 13,
          marginTop: 2,
        },
      }),
    },
    servicePrice: {
      styles: StyleSheet.create({
        text: {
          color: palette.highlightedTextColor,
          fontSize: 16,
          fontWeight: 'bold',
        },
      }),
    },
    serviceBanner: {
      styles: StyleSheet.create({
        text: {
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold',
          textAlign: 'center',
        },
      }),
    },
    searchResultType: {
      styles: StyleSheet.create({
        text: {
          color: palette.primaryDeepColor,
          fontSize: 14,
          fontWeight: 'bold',
        },
      }),
    },
    searchResultTitle: {
      styles: StyleSheet.create({
        text: {
          color: palette.highlightedTextColor,
          fontSize: 17,
          fontWeight: 'bold',
        },
      }),
    },
    searchResultContent: {
      styles: StyleSheet.create({
        text: {
          color: palette.textColor,
          fontSize: 15,
        },
      }),
    },
    searchResultLabel: {
      styles: StyleSheet.create({
        text: {
          color: 'white',
          fontSize: 14,
          fontWeight: 'bold',
          textAlign: 'center',
        },
      }),
    },
    recommendedType: {
      styles: StyleSheet.create({
        text: {
          color: palette.primaryDeepColor,
          fontSize: 13,
          fontWeight: 'bold',
        },
      }),
    },
    recommendedTitle: {
      styles: StyleSheet.create({
        text: {
          color: palette.highlightedTextColor,
          fontSize: 15,
          fontWeight: 'bold',
        },
      }),
    },
    recommendedLabel: {
      styles: StyleSheet.create({
        text: {
          color: 'white',
          fontSize: 13,
          fontWeight: 'bold',
          textAlign: 'center',
        },
      }),
    },
    chatTitle: {
      styles: StyleSheet.create({
        text: {
          color: palette.highlightedTextColor,
          fontSize: 15,
          marginBottom: 4,
        },
      }),
    },
    chatMessage: {
      styles: StyleSheet.create({
        text: {
          color: palette.textColor,
          fontSize: 14,
        },
      }),
    },
    chatDate: {
      styles: StyleSheet.create({
        text: {
          color: palette.textColor,
          fontSize: 12,
        },
      }),
    },
    tip: {
      styles: StyleSheet.create({
        text: {
          color: palette.textColor,
          fontSize: 13,
        },
      }),
    },
    tipWarning: {
      styles: StyleSheet.create({
        text: {
          color: palette.warningColor,
          fontSize: 13,
        },
      }),
    },
    tipDanger: {
      styles: StyleSheet.create({
        text: {
          color: palette.dangerColor,
          fontSize: 13,
        },
      }),
    },
    scheduleDate: {
      styles: StyleSheet.create({
        text: {
          color: palette.textColor,
          fontSize: 24,
        },
      }),
    },
    scheduleWeek: {
      styles: StyleSheet.create({
        text: {
          color: palette.textColor,
          fontSize: 16,
        },
      }),
    },
    accountBalance: {
      styles: StyleSheet.create({
        text: {
          color: palette.highlightedTextColor,
          fontSize: 36,
        },
      }),
    },
    emptyText: {
      styles: StyleSheet.create({
        text: {
          color: palette.placeholderTextColor,
          fontSize: 18,
          textAlign: 'center',
        },
      }),
    },
  },
  TextInput: {
    default: {
      props: {
        placeholderTextColor: palette.placeholderTextColor,
      },
    },
    item: {
      styles: StyleSheet.create({
        textInput: {
          flex: 1,
          height: undefined,
          color: palette.highlightedTextColor,
          paddingHorizontal: 0,
          paddingVertical: 8,
        },
      }),
    },
    itemRight: {
      styles: StyleSheet.create({
        textInput: {
          flex: 1,
          height: undefined,
          color: palette.highlightedTextColor,
          paddingHorizontal: 0,
          textAlign: 'right',
        },
      }),
    },
    review: {
      styles: StyleSheet.create({
        textInput: {
          borderBottomWidth: 1,
          borderBottomColor: palette.borderColor,
          height: undefined,
          paddingBottom: 4,
        },
      }),
    },
  },
  Badge: {
    default: {
      styles: StyleSheet.create({
        root: {
          backgroundColor: palette.primaryColor,
        },
        text: {
          color: 'white',
        },
      }),
    },
    tagGray: {
      styles: StyleSheet.create({
        root: {
          backgroundColor: palette.borderColor,
          borderRadius: 4,
        },
        text: {
          fontWeight: 'normal',
        },
      }),
    },
    certificate: {
      styles: StyleSheet.create({
        root: {
          backgroundColor: palette.secondaryColor,
          borderRadius: 4,
          paddingVertical: 2,
          paddingHorizontal: 8,
          marginRight: 4,
          marginBottom: 4,
        },
        text: {
          // fontWeight: 'normal',
          fontSize: 13,
        },
      }),
    },
    eventStatus: {
      styles: StyleSheet.create({
        root: {
          borderRadius: 4,
          paddingVertical: 2,
          paddingHorizontal: 8,
          position: 'absolute',
          top: 8,
          left: 8,
        },
        text: {
          fontSize: 13,
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
