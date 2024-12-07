import { StyleSheet } from "react-native";
import { colors } from "../../../styles/GlobalStyles";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16,
        backgroundColor: colors.white,
    },
    postContainer: {
        flex: 1,
        marginVertical: 32,
        backgroundColor: colors.white,
    },
    postText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
    },
    postPictureContainer: {
        flex: 1,
    },
    postPicture: {
        height: 240,
        borderRadius: 8,
        marginBottom: 8,
    },
    postTitle: {
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        lineHeight: 19,
        textTransform: "capitalize",
        color: colors.black,
        marginTop: 8,
        marginBottom: 8,
    },
    postInfoContainer: {
        flexDirection: "row",
    },
    postCommentContainer: {
        flexDirection: "row",
        gap: 2,
    },
    postCommentIcon: {
        width: 24,
        height: 24,
    },
    postCommentText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
        color: colors.black,
    },
    postLocationContainer: {
        flexDirection: "row",
        gap: 2,
        marginLeft: 24,
    },
    postLocationButton: {
        width: 24,
        height: 24,
    },
    picturesLoationText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 13,
        lineHeight: 18,
        color:colors.black,
    }
});