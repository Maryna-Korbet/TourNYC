import { createStackNavigator } from "@react-navigation/stack";

import CreatePostsScreen from "../screens/MainScreen/CreatePostsScreen/CreatePostsScreen";
import CameraScreen from "../screens/MainScreen/CameraScreen/CameraScreen";

import IconButton from '../components/buttons/IconButton';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';


const Stack = createStackNavigator();

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