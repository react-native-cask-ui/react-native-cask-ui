const colors = {
  primaryColor: '#79c7ce',
  primaryDeepColor: '#59a7ae',
  secondaryColor: '#ff7e8e',
  secondaryDeepColor: '#df5e6e',
  primaryBgColor: '#fafafc',
  secondaryBgColor: 'white',
  successColor: '#05bb85',
  warningColor: '#d90',
  dangerColor: '#f77',
  grayColor: '#eee',
};

export default {
  ...colors,
  // bar
  barColor: colors.secondaryBgColor,
  barItemColor: '#8d8d8d',
  barItemTintColor: colors.primaryColor,
  barBorderColor: '#ebebeb',
  // navigation bar
  navigationBarColor: colors.primaryColor,
  navigationBarItemColor: 'white',
  navigationBarItemTintColor: 'white',
  navigationBarBorderColor: '#00000033',
  // tab bar
  tabBarColor: colors.secondaryBgColor,
  tabBarItemColor: '#8d8d8d',
  tabBarItemTintColor: colors.secondaryColor,
  tabBarBorderColor: '#00000033',
  // text
  lowlightedTextColor: '#999',
  textColor: '#62717a',
  highlightedTextColor: '#4a4a4a',
  placeholderTextColor: '#999',
  // line
  borderColor: '#ccc',
};
