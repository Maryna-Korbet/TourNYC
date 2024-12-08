import { createStackNavigator } from "@react-navigation/stack";
import * as Location from 'expo-location';

import DefaultPostsScreen from "screens/NestedScreens/DefaultPostsScreen/DefaultPostsScreen";
import CommentsScreen from "screens/NestedScreens/CommentsScreen/CommentsScreen";
import MapScreen from "screens/NestedScreens/MapScreen/MapScreen";

import IconButton from '../components/buttons/IconButton';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';



export type PostsParamList = {
    DefaultPosts: undefined;
    Comments: {
        postId: string;
    };
    Map: {
        location: Location.LocationObject | undefined;
    };
};


const Stack = createStackNavigator<PostsParamList>();

const PostsNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="DefaultPosts"
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
                name="DefaultPosts"
                options={{ headerShown: false }}
                component={DefaultPostsScreen}
            />
            <Stack.Screen
                name="Comments"
                component={CommentsScreen}
                options={({ navigation }) => ({
                    stackHeaderShown: false,
                    title: 'Comments',
                    headerTitleStyle: {
                        fontFamily: 'Roboto-Bold',
                        fontSize: 17,
                        lineHeight: 22,
                        letterSpacing: -0.41,
                    },
                    headerTitleAlign: 'center',

                    headerLeft: () => (
                        <IconButton
                            icon={<ArrowLeftIcon />}
                            onPress={() => navigation.goBack()}
                        />
                    ),
                })}
            />
            <Stack.Screen
                name="Map"
                component={MapScreen}
                options={({ navigation }) => ({
                    title: 'Map',
                    headerLeft: () => (
                        <IconButton
                            icon={<ArrowLeftIcon />}
                            onPress={() => navigation.goBack()}
                        />
                    )
                })}
            />
        </Stack.Navigator>
    )
};

export default PostsNavigator;