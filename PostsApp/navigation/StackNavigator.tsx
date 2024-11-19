import { createStackNavigator } from '@react-navigation/stack';
import RegistrationScreen from '../screens/AuthScreens/RegistrationScreens/RegistrationScreen';
import LoginScreen from '../screens/AuthScreens/LoginScreen/LoginScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName='Registration'
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="Registration"
                component={RegistrationScreen}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    presentation: 'transparentModal',  
                }}
            />
        </Stack.Navigator>
    )
};

export default StackNavigator;