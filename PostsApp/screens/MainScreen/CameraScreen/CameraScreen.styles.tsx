import { StyleSheet } from 'react-native';
import { colors } from '../../../styles/GlobalStyles';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraContainer: {
        height: 300,
        backgroundColor: colors.orange,
    },
});
