import "react-native-gesture-handler";
import React, { useEffect } from 'react';
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import Loader from "components/loader/Loader";
import AppNavigationContainer from "./navigation/AppNavigationContainer";


// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync(); 

export default function App() {
  
  const [fontsloaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
  });

  useEffect(() => {
    if (fontsloaded) {
      // Hide the splash screen after font loading
      SplashScreen.hideAsync(); 
    }
  }, [fontsloaded]);

  if (!fontsloaded) {
    // Show a loading indicator while fonts are loading
    return <Loader/>; 
  }

  return (
    <Provider store={store}>
      <PersistGate
        loading={<Loader />}
        persistor={persistor}
      >
        <AppNavigationContainer />
      </PersistGate>
    </Provider>
  );
};