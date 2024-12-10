import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../../styles/GlobalStyles';


const Loader = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.orange} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        zIndex: 3,
    },
});

export default Loader;
