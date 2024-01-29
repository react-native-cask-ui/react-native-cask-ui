const colorsV2 = {
  colorBlue: '#2962FF',
  colorLightBlue: '#BBCDFF',
  colorExtraLightBlue: '#EAEFFF',
  colorGreen: '#5FC417',
  colorLightGreen: '#CCECB5',
  colorExtraLightGreen: '#EFF9E8',
  colorOrange: '#FD9F00',
  colorLightOrange: '#FED999',
  colorExtraLightOrange: '#FFF5E5',
  colorRed: '#FF5454',
  colorLightRed: '#FCC7B7',
  colorExtraLightRed: '#FEEEE8',
  colorBlack: '#000000',
  colorWhite: '#FFFFFF',
  colorDark: '#222224',
  colorExtraDarkGray: '#6E6E70',
  colorDarkGray: '#9D9DA1',
  colorGray: '#CFCFD3',
  colorLightGray: '#ECECF0',
  colorExtraLightGray: '#F8F8FC',
  colorExtraLightYellow: '#FFF7D9',
};

const colors = {
  primaryColor: colorsV2.colorBlue,
  successColor: colorsV2.colorGreen,
  warningColor: colorsV2.colorExtraLightYellow,
  dangerColor: colorsV2.colorRed,
  grayColor: '#eee',
};

export default {
  ...colors,
  ...colorsV2,
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
