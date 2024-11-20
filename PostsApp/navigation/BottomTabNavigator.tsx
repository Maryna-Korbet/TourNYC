import React, { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from '@expo/vector-icons/Feather';

import TabNavigator from '../components/navigation/TabNavigator';
import PostsScreen from '../screens/MainScreen/PostsScreen/PostsScreen';
import CreatePostsScreen from '../screens/MainScreen/CreatePostsScreen/CreatePostsScreen';
import ProfileScreen from '../screens/MainScreen/CreatePostsScreen/CreatePostsScreen';
import IoniconsElement from '../components/icons/IoniconsElement';
import IconButton from '../components/buttons/IconButton';
import LogOutIcon from '../icons/LogOutIcon';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import { colors } from '../styles/GlobalStyles';


const Tab = createBottomTabNavigator();

const BottomTabNavigator: FC = () => {
    return (
        <TabNavigator
            initialRouteName="Posts"
            screenOptions={{
                headerTitleStyle: {
                    fontFamily: 'Roboto-Bold',
                    fontSize: 17,
                    lineHeight: 22,
                    letterSpacing: -0.41,
                },
                headerTitleAlign: 'center',
                headerRightContainerStyle: { paddingRight: 16 },
                headerLeftContainerStyle: { paddingLeft: 16 },
                tabBarLabel: '',
            }}
        >
            <Tab.Screen
                name="Posts"
                component={PostsScreen}
                options={{
                    title: 'Publications',
                    headerRight: () => (
                        <IconButton
                            icon={<LogOutIcon />}
                            onPress={() => console.log('Log Out')}
                        />
                    ),
                    tabBarIcon: () => (
                        <IoniconsElement
                            IconComponent={Feather}
                            name="grid"
                            size={24}
                            color={colors.black}
                            onPress={() => console.log('Grid')}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Create Posts"
                component={CreatePostsScreen}
                options={({ navigation }) => ({
                    title: 'Create a publication',
                    headerLeft: () => (
                        <IconButton
                            icon={<ArrowLeftIcon />}
                            onPress={() => navigation.goBack()}
                        />
                    ),
                    tabBarIcon: () => (
                        <IoniconsElement
                            IconComponent={Feather}
                            name="plus"
                            color={colors.white}
                            isOval={true}
                            onPress={() => console.log('Plus')}
                        />
                    ),
                })}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: 'Profile',
                    headerRight: () => (
                        <IconButton
                            icon={<LogOutIcon />}
                            onPress={() => console.log('Log Out')}
                        />
                    ),
                    tabBarIcon: () => (
                        <IoniconsElement
                            IconComponent={Feather}
                            name="user"
                            size={24}
                            color={colors.black}
                            onPress={() => console.log('User')}
                        />
                    ),
                }}
            />
        </TabNavigator>
    )
};

export default BottomTabNavigator;