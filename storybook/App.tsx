import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const App = () => {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
};

const AppEntryPoint =
  Constants.expoConfig?.extra?.storybookEnabled === 'true'
    ? // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('./.ondevice').default
    : App;

export default AppEntryPoint;
