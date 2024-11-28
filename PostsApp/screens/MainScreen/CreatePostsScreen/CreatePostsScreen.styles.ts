import { StyleSheet } from "react-native";
import { colors } from "../../../styles/GlobalStyles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: 16,
    },
 /*    publishContainer: {
        flex: 1,
        marginHorizontal: 16,
    }, */
    publishButton: {
        flex: 1,
        width: "100%",
    },
    publishButtonText: {
        alignSelf: "center",
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 19,
        color: colors.white,
    },
});