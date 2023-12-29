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
    },
    dropboxSelection: {
        width: '100%',
        borderWidth: 1,
        marginBottom: "5%",
        borderRadius: 5,

    },
    dropboxItem: {
        fontSize: 14
    },
    title: {
        paddingBottom: 5
    }
});

export const authentificationStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: "10%",
    },
    imgLogo: {
        borderColor: "white",
        borderWidth: 10,
        borderRadius: 99999,
        width: 250,
        height: 250,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "20%",
        marginBottom: "-10%"
    },
    header: {
        fontSize: 30,
        marginVertical: "20%",
        color: '#006500',
        textAlign: 'center',
        fontWeight: "bold",
        letterSpacing: 4,
        textTransform: "uppercase",
        textShadowRadius: 2,
        textShadowOffset:{width: 1.5, height: -0.5},
        textShadowColor: "#80BE1D"
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
        // backgroundColor: 'grey',
        backgroundColor: '#006500',
        padding: 15,
        borderRadius: 5,
        marginBottom: "5%"
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: 1,
        textShadowRadius: 1,
        textShadowColor: "black"
    },
    buttonLink: {
        alignItems: "center",
        marginTop: "5%"
    },
    buttonLinkText: {
        color: '#006500',
        fontSize: 16,
        marginBottom: "2.5%",
        fontWeight: "bold",
        alignItems: "center",
        textDecorationLine: 'underline',
        letterSpacing: 1,
        textShadowRadius: 1,
        textShadowColor: "black"
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
        textTransform: "capitalize"
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

export const stockStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
    },
    btnContainer: {
        position: "absolute",
        width: '100%',
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: "10%"
    },
    button: {
        width: '100%',
        padding: 15,
        borderRadius: 5,
        marginBottom: "5%",
        backgroundColor: '#016400',
    },
    imgTemplate: {
        alignSelf: 'center',
        width: 200,
        height: 200,
        marginVertical: "5%",
        backgroundColor: 'grey'
    }
})