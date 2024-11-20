import { createStackNavigator } from '@react-navigation/stack';
import RegistrationScreen from '../screens/AuthScreens/RegistrationScreens/RegistrationScreen';
import LoginScreen from '../screens/AuthScreens/LoginScreen/LoginScreen';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

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
                name="PostsScreen"
                component={BottomTabNavigator}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
};

export default StackNavigator;