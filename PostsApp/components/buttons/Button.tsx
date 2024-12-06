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
    disabled?: boolean,
    onPress: () => void,
};

const Button: FC<ButtonProps> = ({ children, buttonStyles, disabled, onPress }) => {
    return (
        <View>
            <TouchableOpacity
                style={[styles.button, buttonStyles]}
                disabled={disabled}
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