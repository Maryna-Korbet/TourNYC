import { StyleSheet } from "react-native";
import { colors } from "../../../styles/GlobalStyles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 16,
        backgroundColor: colors.white,
    },
    postContainer: {
        flex: 1,
        marginVertical: 32,
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
        marginBottom: 8,
    },
    picturesLoationTitle: {
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        lineHeight: 19,
    },
    picturesLoationText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 13,
        lineHeight: 18,
        color:colors.black,
    }
});