import { createStackNavigator } from "@react-navigation/stack";
import * as Location from 'expo-location';

import CreatePostsScreen from "../screens/MainScreen/CreatePostsScreen/CreatePostsScreen";
import CameraScreen from "../screens/NestedScreens/CameraScreen/CameraScreen";

import IconButton from '../components/buttons/IconButton';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';


export type CreatePostStackParamList = {
    Camera: undefined;
    CreatePost: {
        picture?: string,
        location?: Location.LocationObject | undefined;
    };
    Map: {
        location?: Location.LocationObject | undefined;
    };
};

const Stack = createStackNavigator<CreatePostStackParamList>();

const CreatePostNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="CreatePost"
            screenOptions={({ navigation }) => ({
                headerRightContainerStyle: { paddingRight: 16 },
                headerLeftContainerStyle: { paddingLeft: 16 },
                headerLeft: () => (
                    <IconButton
                        icon={<ArrowLeftIcon />}
                        onPress={() => navigation.goBack()}
                    />
                ),
            })}
        >
            <Stack.Screen
                name="CreatePost"
                options={{ headerShown: false }}
                component={CreatePostsScreen}
            />
            <Stack.Screen
                name="Camera"
                component={CameraScreen}
            />
        </Stack.Navigator>
    )
};

export default CreatePostNavigator;