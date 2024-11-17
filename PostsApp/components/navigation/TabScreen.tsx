import React, { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

type TabScreenProps = { 
    name: string; 
    options?: any; 
    component: React.ComponentType<any>; 
};

const TabScreen: FC<TabScreenProps> = ({ name, options, component }) => { 
    return (
        <Tab.Screen
            name={name}
            component={component}
            options={options}
        />
    );
};

export default TabScreen;