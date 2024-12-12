import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from "./StackNavigator";

import { authStateChanged } from "../services/auth";


const AppNavigationContainer: FC = () => {
    const dispatch = useDispatch();

    // Tracking changes in authentication status
    useEffect(() => {
        authStateChanged(dispatch);
    }, [dispatch]);

    // Render main navigation
    return (
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    );
};

export default AppNavigationContainer;