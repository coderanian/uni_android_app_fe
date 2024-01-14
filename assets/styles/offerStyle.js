import {StyleSheet} from "react-native";

export const offerStyle = StyleSheet.create({
    container: {
        paddingLeft: "10%",
        paddingRight: "5%",
        paddingVertical: "5%",
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "grey",
    },
    authorContainer: {
        paddingHorizontal: "0%",
        paddingVertical: "5%",
        backgroundColor: "white",
        borderTopWidth: 1,
        borderTopColor: "grey",
    },
    innercontainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    img: {
        width: 90,
        height: 90,
        marginRight: "10%",
    },
    imgTemplate: {
        width: 90,
        height: 90,
        marginRight: "10%",
        backgroundColor: "grey"
    },
    textContainer: {
        flex: 1,
        flexDirection: "column"
    },
    title: {
        textTransform: "uppercase",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    text: {
        fontSize: 14,
        marginBottom: 5,
        textTransform: "capitalize",
    },
    menuContainer: {
        position: 'absolute',
        top: 0,
        right: 0
    },
    btn: {
        padding: 15,
    },
    btnIcon: {
        fontSize: 24,
    },
    statusContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    statusIconAvailable: {
        fontSize: 18,
        color: "#016400",
        paddingRight: 5
    },
    statusIconReserved: {
        fontSize: 18,
        color: "grey",
        paddingRight: 5
    },
});