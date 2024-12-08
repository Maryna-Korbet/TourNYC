import { createStackNavigator } from '@react-navigation/stack';

import RegistrationScreen from '../screens/AuthScreens/RegistrationScreens/RegistrationScreen';
import LoginScreen from '../screens/AuthScreens/LoginScreen/LoginScreen';
import BottomTabNavigator from './BottomTabNavigator';

export type StackParamList = {
    Home: undefined,
    Login: undefined,
    Registration: undefined,
};

const Stack = createStackNavigator<StackParamList>();


const StackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName='Login'
        >
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
            <Stack.Screen
                name="Home"
                component={BottomTabNavigator}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
};

export default StackNavigator;