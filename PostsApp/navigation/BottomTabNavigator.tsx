import React, { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from '@expo/vector-icons/Feather';

import TabNavigator from '../components/navigation/TabNavigator';
import CreatePostNavigator from '../navigation/CreatePostNavigator';
import ProfileScreen from '../screens/MainScreen/ProfileScreen/ProfileScreen';
import PostsNavigator from './PostsNavigator';

import IoniconsElement from '../components/icons/IoniconsElement';
import IconButton from '../components/buttons/IconButton';
import LogOutIcon from '../icons/LogOutIcon';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';

import { colors } from '../styles/GlobalStyles';



type  BottomTabParamList = {
    DefaultPostsStack: undefined;
    CreatePostsStack: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator: FC = () => {
    return (
        <TabNavigator
            initialRouteName="DefaultPostsStack"
            screenOptions={{
                tabBarLabel: '',
                headerTitleStyle: {
                    fontFamily: 'Roboto-Bold',
                    fontSize: 17,
                    lineHeight: 22,
                    letterSpacing: -0.41,
                },
                headerTitleAlign: 'center',
                headerRightContainerStyle: { paddingRight: 16 },
                headerLeftContainerStyle: { paddingLeft: 16 },
                tabBarIcon: () => (
                    <IoniconsElement
                        IconComponent={Feather}
                        name="grid"
                        size={24}
                        color={colors.black}
                    />
                ),
            }}
        >
            <Tab.Screen
                name="DefaultPostsStack"
                component={PostsNavigator}
                options={{
                    title: 'Publications',
                    headerRight: () => (
                        <IconButton
                            icon={<LogOutIcon />}
                            onPress={() => console.log('Log Out')}
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
                    tabBarIcon: ({ focused }) => (
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