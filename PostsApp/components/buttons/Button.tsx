import React, { FC } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    ViewProps,
} from "react-native";
import {colors} from "../../styles/GlobalStyles";


type ButtonProps = {
    children: React.ReactNode,
    buttonStyles?: ViewProps['style'],
    onPress: () => void,
};

const Button: FC<ButtonProps> = ({ children, buttonStyles, onPress }) => {
    return (
        <View>
            <TouchableOpacity
                style={[styles.button, buttonStyles]}
                onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 100,
        paddingVertical: 16,
        paddingHorizontal: 32,
        backgroundColor: colors.orange,
    }
});

export default Button;