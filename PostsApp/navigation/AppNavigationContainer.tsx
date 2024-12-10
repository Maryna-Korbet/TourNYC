import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from "./StackNavigator";


const AppNavigationContainer: FC = () => {
    return (
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    );
};

export default AppNavigationContainer;