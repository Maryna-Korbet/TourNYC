import { StatusBar } from 'expo-status-bar';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

SplashScreen.preventAutoHideAsync(); // Keep the splash screen visible while we fetch resources

export default function App() {

  const [fontsloaded] = Font.useFonts({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
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
    <View style={styles.container}>
      <Image
          style={styles.image}
          source={require('./assets/images/background/background-photo.jpg')}
        />
      <StatusBar style="auto" /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

