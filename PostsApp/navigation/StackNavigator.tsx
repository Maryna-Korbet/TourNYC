import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import RegistrationScreen from '../screens/AuthScreens/RegistrationScreens/RegistrationScreen';
import LoginScreen from '../screens/AuthScreens/LoginScreen/LoginScreen';
import BottomTabNavigator from './BottomTabNavigator';

import { RootState } from '../redux/rootReducer';



export type StackParamList = {
    Home: undefined,
    Login: undefined,
    Registration: undefined,
};

const Stack = createStackNavigator<StackParamList>();

const StackNavigator = () => {
    const user = useSelector((state: RootState) => state.auth.userInfo);
    
    return (
        <Stack.Navigator>
            {!user ? (
                //if user is not logged in go to Login
                <>
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{
                            presentation: 'transparentModal',
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="Registration"
                        component={RegistrationScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                </>
            ) : (
                //if user is logged in go to Home
                <Stack.Screen
                    name="Home"
                    component={BottomTabNavigator}
                    options={{
                        headerShown: false,
                    }}
                />
            )}
        </Stack.Navigator>
    )
};

export default StackNavigator;