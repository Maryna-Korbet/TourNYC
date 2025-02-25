import { StyleSheet } from 'react-native';
import { colors } from '../../../styles/GlobalStyles';

export const styles = StyleSheet.create({
    background_image: {
        position: 'absolute',
        resizeMode: 'cover',
        height: '100%',
        width: '100%',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 0,
    },
    formContainer: {
        position: 'absolute',
        height: '60%',
        backgroundColor: colors.white,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 32,
        paddingBottom: 0,
    },
    title: {
        fontFamily: 'Roboto-Bold',
        fontSize: 30,
        fontWeight: "500",
        lineHeight: 36,
        letterSpacing: 0.01,
        textAlign: 'center',
        color: colors.black,
        marginBottom: 32,
    },
    innerContainer: {
        width: '100%',
        gap: 16,
        marginBottom: 43,
    },
    baseText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 18,
    },
    show: {
        color: colors.blue,
    },
    outerStyles: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonsContainer: {
        width: '100%',
        gap: 16,
        marginBottom: 32,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: colors.white,
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        color: colors.blue,
        gap: 4,
    },
    signUpText: {
        textDecorationLine: 'underline',
    },
});