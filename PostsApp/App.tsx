// import "react-native-gesture-handler";
// import React, { useEffect } from 'react';
// import {
//   ActivityIndicator,
//   StyleSheet,
//   View,
// } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native'
// import { useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';

// import BottomTabNavigator from './navigation/BottomTabNavigator';

// import { colors } from './styles/GlobalStyles';


// SplashScreen.preventAutoHideAsync(); // Keep the splash screen visible while we fetch resources

// export default function App() {
  
//   const [fontsloaded] = useFonts({
//     'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
//     'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
//     'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
//     'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
//   });

//   useEffect(() => {
//     if (fontsloaded) {
//       SplashScreen.hideAsync(); // Hide the splash screen after font loading
//     }
//   }, [fontsloaded]);

//   if (!fontsloaded) {
//     return <ActivityIndicator size={"large"} color={"#FF6C00"}/>; // Show a loading indicator while fonts are loading
//   }

//   return (
//     <View style={styles.container}>
//       <NavigationContainer>
//         <BottomTabNavigator />
//       </NavigationContainer>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.white,
//   },
// });


import "react-native-gesture-handler";
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import BottomTabNavigator from './navigation/BottomTabNavigator';



SplashScreen.preventAutoHideAsync(); // Keep the splash screen visible while we fetch resources

export default function App() {
  
  const [fontsloaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
  });

  useEffect(() => {
    if (fontsloaded) {
      SplashScreen.hideAsync(); // Hide the splash screen after font loading
    }
  }, [fontsloaded]);

  if (!fontsloaded) {
    return <ActivityIndicator size={"large"} color={"#FF6C00"}/>; // Show a loading indicator while fonts are loading
  }

  return (
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
  );
};
