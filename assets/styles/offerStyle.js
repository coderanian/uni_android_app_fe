import {StyleSheet} from "react-native";

export const offerStyle = StyleSheet.create({
    container: {
        paddingHorizontal: "10%",
        paddingVertical: "5%",
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "grey",
    },
    innercontainer: {
        flexDirection: "row",
        alignItems: "center",
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
    menu: {
        borderWidth: 1,
        borderColor: "grey",
        zIndex: 10000
    },
    menuItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "grey",
    },
    btn: {
        position: "absolute",
        top: 0,
        right: 0,
        padding: 15,
    },
    btnIcon: {
        fontSize: 24
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