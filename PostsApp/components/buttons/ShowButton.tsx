import React, {FC} from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../styles/GlobalStyles';


interface ShowButtonProps {
    togglePasswordVisibility: () => void;
}

const ShowButton: FC<ShowButtonProps> = ({ togglePasswordVisibility }) => {
    return (
        <TouchableOpacity onPress={togglePasswordVisibility}>
            <Text style={styles.show}>show</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    show: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 18,
        color: colors.blue,
    }
});

export default ShowButton;