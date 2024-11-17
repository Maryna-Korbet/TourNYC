import React, {FC} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();

type TabNavigatorProps = { 
    screenOptions?: any,
    children: React.ReactNode,
    initialRouteName?: string,
};

const TabNavigator: FC<TabNavigatorProps> = ({ screenOptions, children, initialRouteName }) => { 
    return (
        <Tab.Navigator
            screenOptions={screenOptions}
            initialRouteName={initialRouteName}
        >
            { children }
        </Tab.Navigator>
    );
};

export default TabNavigator;