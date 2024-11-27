import { StyleSheet } from "react-native";
import { colors } from "../../../styles/GlobalStyles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 32,
        marginHorizontal: 16,
    },
    postContainer: {
        flex: 1,
        marginBottom: 32,
    },
    postText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
    },
    postPicture:{
        width: 343,
        height: 240,
        borderRadius: 8,
    }
});