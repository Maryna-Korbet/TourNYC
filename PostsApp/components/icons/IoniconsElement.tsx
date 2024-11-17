import React, { FC } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { colors } from '../../styles/GlobalStyles';

type IoniconsElementProps = {
    IconComponent: any; 
    name: string;       
    size?: number;      
    color?: string;
    style?: any;
    isOval?: boolean;
    onPress?: () => void;
};

const IoniconsElement: FC<IoniconsElementProps> = ({
    IconComponent,
    name,
    size,
    color,
    style,
    isOval=false,
    onPress,
}) => {
    const ovalStyle = isOval ? styles.ovalContainer : styles.iconContainer;

    return (
        <View style={[ovalStyle, style]}>
            <IconComponent
                name={name}
                size={size}
                color={color}
                style={style}
                onPress={onPress}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
    },
    ovalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 40,
        backgroundColor: colors.orange,
        color: colors.white,
        borderRadius: 20,
    },
});

export default IoniconsElement;
