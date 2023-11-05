import {StyleSheet} from "react-native";

/**
 * Stylesheets for various screens and isolated app components
 * @author Konstantin K.
 */
export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 25,
        padding: 10,
        textAlign: 'center',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    msgErr: {
        marginBottom: "5%",
        color: 'red'
    },
    chkBoxSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: "5%"
    },
    chkBox: {
        marginRight: 8,
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1,
    },
    navHeader: {
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 0.5,
        shadowColor: 'lightgrey',
        shadowOffset: 1
    },
    activeIcon: {
        color: '#016400'
    },
    standardIcon: {
        paddingRight: "5%",
        fontSize: 24,
        color: 'gray'
    }
});

export const authentificationStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: "10%",
    },
    header: {
        fontSize: 34,
        paddingVertical: "20%",
    },
    body: {
        marginBottom: "5%"
    },
    inputContainerPw: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: "5%"
    },
    inputPw: {
        flex: 1,
    },
    iconPw: {
        fontSize: 24,
        color: "gray",
    },
    inputRegular: {
        width: '100%',
        borderWidth: 1,
        marginBottom: "5%",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
    },
    button: {
        width: '100%',
        backgroundColor: 'grey',
        padding: 15,
        borderRadius: 5,
        marginBottom: "5%"
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    buttonLink: {
        marginTop: "5%",
    },
    buttonLinkText: {
        color: 'black',
        textDecorationLine: 'underline',
    }
});

export const profileStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        backgroundColor: 'white',
        paddingHorizontal: "10%",
    },
    headerContainer: {
        flexDirection: "row",
        paddingVertical: "5%",
        flex: 1,
    },
    textContainer: {
        paddingRight: "40%",
    },
    propertyValue: {
        fontWeight: "bold",
        fontSize: 18,
    },
    imgContainer: {
        flex: 1,
        aspectRatio: 1,
        resizeMode: 'contain',
        borderRadius: 350
    },
    imgEditContainer: {
        alignSelf: 'center',
        width: 200,
        height: 200,
        marginVertical: "5%",
        borderRadius: 150
    },
    detailsContainer: {
        paddingBottom: "5%"
    },
    mapContainer: {
        marginVertical: "5%",
        width: "100%",
        height: 300,
    },
});