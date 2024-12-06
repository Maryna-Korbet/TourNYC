import { StyleSheet } from 'react-native';
import { colors } from '../../../styles/GlobalStyles';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        gap: 8,
        paddingVertical: 32,
    },
    permissionContainer: {
        position: "absolute",
        height: "100%",
        width: "100%",
        zIndex: 2,
        flex: 1,
        justifyContent: "center",
        backgroundColor: colors.white,
        top: 0.5,
        left: 0.5,
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
    },
    permissionMessage: {
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        textAlign: 'center',
        paddingBottom: 10,
        color: colors.black,
    },
    camera: {
        width: "100%",
        height: 240,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
    },
    buttonCircle: {
        width: 60,
        height: 60,
        backgroundColor: colors.white,
        opacity: 0.3,
        borderRadius: 50,
    },
    iconPosition: {
        position: 'absolute',
        top: 0.5,
        left: 0.5,
        right: 0.5,
        bottom: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    toggleButton: {
        position: 'relative',
        bottom: 12, 
        left: "42%", 
        borderRadius: 50,
        padding: 4,
    },
    buttonPermission: {
        color: colors.white,
        backgroundColor: colors.orange,
    },
    editButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: "transparent",
    },
    editButton: {
        flex: 1,
    },
    editText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
    },
    editTextColor: {
        color: colors.grey,
    },
    editTextColorActive: {
        color: colors.black,
    },
})
