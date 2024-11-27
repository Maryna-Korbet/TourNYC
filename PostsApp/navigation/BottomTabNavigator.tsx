import React, { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from '@expo/vector-icons/Feather';

import TabNavigator from '../components/navigation/TabNavigator';
import PostsScreen from '../screens/MainScreen/PostsScreen/PostsScreen';
import CreatePostNavigator from '../navigation/CreatePostNavigator';
import ProfileScreen from '../screens/MainScreen/CreatePostsScreen/CreatePostsScreen';
import MapScreen from '../screens/MainScreen/MapScreen/MapScreen';

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
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Map"
                component={MapScreen}
                options={{
                    title: 'Map',
                    tabBarIcon: ({ focused }) => (
                        <IoniconsElement
                            IconComponent={Feather}
                            name="map-pin"
                            size={24}
                            color={focused ? colors.orange : colors.grey}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="CreatePostsStack"
                component={CreatePostNavigator}
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
                    tabBarIcon: ({focused}) => (
                        <IoniconsElement
                            IconComponent={Feather}
                            name="user"
                            size={24}
                            color={focused ? colors.orange : colors.black}
                        />
                    ),
                }}
            />
        </TabNavigator>
    )
};

export default BottomTabNavigator;