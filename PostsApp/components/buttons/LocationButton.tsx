import React, { FC, useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

import IconButton from '../buttons/IconButton';
import { colors } from '../../styles/GlobalStyles';

interface LocationButtonProps {
    style?: any;
    onLocation: () => void;
};

const LocationButton: FC<LocationButtonProps> = ({ onLocation, style }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <TouchableOpacity
            style={[
                style,  
            ]}
            onPress={onLocation}
            onFocus={handleFocus} 
            onBlur={handleBlur}   
        >
            <IconButton
                icon={<Feather
                    name="map-pin" size={24}
                    color={isFocused ? colors.orange : colors.grey} 
                />}
                onPress={onLocation} 
            />
        </TouchableOpacity>
    );
};


export default LocationButton;