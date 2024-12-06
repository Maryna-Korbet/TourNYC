import { StyleSheet } from "react-native";
import { colors } from "../../../styles/GlobalStyles";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor: colors.white,
    },
    publishContainer: {
        height: "100%",
        flexDirection: "column",
        marginHorizontal: 16,
    },
    publishButtonContainer: {
        flex: 1,
        width: "100%",
    },
    publishButtonText: {
        flex: 1,
        alignSelf: "center",
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 19,
        color: colors.white,
    },
    publishInputsContainer: {
        marginBottom: 32,
    },
    publishInput: {
        width: "100%",
        alignItems: "center",
        padding: 0,
        marginBottom: 0,

        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        fontWeight: "500",
        lineHeight: 19,
        color: colors.black,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 1,
        borderRadius: 0,
        borderBottomColor: colors.grey,
        paddingHorizontal: 0,
    },
    inputContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderRadius: 0,
        borderBottomColor: colors.grey,
        backgroundColor: colors.white,
        marginTop: 16,
    },
    nameInput: {
        width: "100%",
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 18,
        color: colors.black,
        padding: 0,
    },
    locacionInputContainer: {
        width: "100%",
        flexDirection: "row",
    },
    locacionInput: {
        width: 315,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 18,
        color: colors.black,
        padding: 0,
        marginLeft: 2,
    },
    locationButton: {
        width: 24,
        height: 24,
    },
});