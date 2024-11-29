import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DefaultPostsScreen from '../../NestedScreens/DefaultPostsScreen/DefaultPostsScreen';
import CommentsScreen from '../../NestedScreens/CommentsScreen/CommentsScreen';
import MapScreen from '../../NestedScreens/MapScreen/MapScreen';

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
    <NestedScreen.Navigator>
        <NestedScreen.Screen name="DefaultPost" component={DefaultPostsScreen} />
        <NestedScreen.Screen name="Comments" component={CommentsScreen} />
        <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
};

export default PostsScreen;