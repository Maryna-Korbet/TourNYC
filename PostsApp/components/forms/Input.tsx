import {
    TextInput,
    StyleSheet,
    View,
    ViewProps,
    Text
} from "react-native";
import React, {FC, useState} from "react";
import {colors} from "../../styles/GlobalStyles";


type InputProps = {
    value: string,
    error?: string,
    placeholder?: string,
    placeholderTextColor?: string,
    outerStyles?: ViewProps['style'],
    rightButton?: React.ReactNode,
    leftButton?: React.ReactNode,
    secureTextEntry?: boolean,
    autofocus?: boolean,
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters',
    icon?: React.ReactNode,
    onValueChange: (value: string) => void,
    onEndEditing?: () => void,
};

const Input: FC<InputProps> = ({
    value,
    error,
    placeholder,
    placeholderTextColor,
    outerStyles,
    rightButton,
    leftButton,
    secureTextEntry = false,
    autofocus = false,
    autoCapitalize = 'none',
    icon,
    onValueChange,
    onEndEditing,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const onFocus = () => {
        setIsFocused(true);
    }

    const onBlur = () => {
        setIsFocused(false);
    }

    return (
        <View style={[styles.input, isFocused && styles.focused, outerStyles, props]}>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            {leftButton && <View style={styles.leftButton}>{leftButton}</View>}
            <TextInput
                style={styles.textInput}
                value={value}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                secureTextEntry={secureTextEntry}
                autoFocus={autofocus}
                autoCapitalize={autoCapitalize}
                onFocus={onFocus}
                onBlur={onBlur}
                onChangeText={onValueChange}
                onEndEditing={onEndEditing}
                {...props}
            />  
            {rightButton}
        </View>
    )
};

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 16,
        paddingVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: colors.border_color,
        backgroundColor: colors.text_gray,
        opacity: 1,
    },
    textInput: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 18,
        color: colors.black,
    },
    errorText: {
        position: 'absolute',
        backgroundColor: colors.white,
        marginLeft: 16,
        marginTop: -12,
        color: colors.error,
    },
    focused: {
        borderColor: colors.orange,
        backgroundColor: colors.white,
        color: colors.black,
    },
    leftButton: {
        marginRight: 8,
        padding: 0,
        margin: 0,
    },
});

export default Input;