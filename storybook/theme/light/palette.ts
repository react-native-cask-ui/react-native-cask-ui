const colorNext = {
  blue: '#2962FF',
  lightBlue: '#BBCDFF',
  extraLightBlue: '#EAEFFF',
  green: '#5FC417',
  lightGreen: '#CCECB5',
  extraLightGreen: '#EFF9E8',
  orange: '#FD9F00',
  lightOrange: '#FED999',
  extraLightOrange: '#FFF5E5',
  red: '#FF5454',
  lightRed: '#FCC7B7',
  extraLightRed: '#FEEEE8',
  black: '#000000',
  white: '#FFFFFF',
  dark: '#222224',
  extraDarkGray: '#6E6E70',
  darkGray: '#9D9DA1',
  gray: '#CFCFD3',
  lightGray: '#ECECF0',
  extraLightGray: '#F8F8FC',
  extraLightYellow: '#FFF7D9',
};

const colors = {
  primaryColor: colorNext.blue,
  successColor: colorNext.green,
  warningColor: colorNext.extraLightYellow,
  dangerColor: colorNext.red,
  grayColor: '#eee',
};

export default {
  ...colors,
  ...colorNext,
  // bar
  barColor: colors.primaryColor,
  barItemColor: '#8d8d8d',
  barItemTintColor: colors.primaryColor,
  barBorderColor: '#ebebeb',
  // navigation bar
  navigationBarColor: colors.primaryColor,
  navigationBarItemColor: 'white',
  navigationBarItemTintColor: 'white',
  navigationBarBorderColor: '#00000033',
  // tab bar
  tabBarColor: colors.primaryColor,
  tabBarItemColor: '#8d8d8d',
  tabBarItemTintColor: colors.primaryColor,
  tabBarBorderColor: '#00000033',
  // text
  lowlightedTextColor: '#999',
  textColor: '#62717a',
  highlightedTextColor: '#4a4a4a',
  placeholderTextColor: '#999',
  // line
  borderColor: '#ccc',
};
