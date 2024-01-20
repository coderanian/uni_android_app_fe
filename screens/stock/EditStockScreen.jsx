import React, {useState} from "react";
import {Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useAuth} from "../../context/AuthContext";
import {accessCamera} from "../../services/accessCamera";
import {authentificationStyles, commonStyles, profileStyles, stockStyles} from "../../assets/styles/commonStyles";
import CustomTextInput from "../../components/Input/CustomTextInput";
import CustomDropdownInput from "../../components/Input/CustomDropdownInput";
import {offerCategories, offerTypes} from "../../utils/constants";
import CurrencyInput from "react-native-currency-input";
import ReturnButton from "../../components/Input/ReturnButton";
import {useSnackbar} from "../../context/SnackbarContext";

const EditStockScreen = ({navigation, route}) => {
    const {offer} = route.params;
    const {onPutOffer, onLogout} = useAuth();
    const [offerId, setOfferId] = useState(offer.offerId)
    const [title, setTitle] = useState(offer.title);
    const [category, setCategory] = useState(offer.category);
    const [quantity, setQuantity] = useState(offer.quantity);
    const [description, setDescription] = useState(offer.description);
    const [priceType, setPriceType] = useState(offer.priceType);
    const [price, setPrice] = useState(offer.price);
    const [productPic, setProductPic] = useState(offer.productPic);

    const { showSnackbar } = useSnackbar();

    const update = async () => {
        if(!title || !category || !quantity || !priceType || price === null){
            Alert.alert("Fehler", "Bitte überprüfe deine Eingaben!");
        } else {
            const result = await onPutOffer(offerId, title, description, category, quantity, priceType, price, productPic)
            if(result && result.error){
                if (result.status.toString() === '403') {
                    onLogout();
                    Alert.alert("Login","Login abgelaufen.")
                }else{
                    Alert.alert(result.status, result.msg);
                }
            } else {
                showSnackbar('Angebot wurde aktualisiert');
                navigation.goBack();
            }
        }
    }

    /**
     * Ensure that picture state is updated after fetching location
     */
    const updatePic = async () => {
        try {
            const newPic = await accessCamera();
            setProductPic(newPic);
        } catch (e) {
            Alert.alert("Fehler", e);
        }
    }

    return (
        <View style={profileStyles.container}>
            <ScrollView style={profileStyles.body}>
                {productPic ? (
                    <Image
                        style={stockStyles.imgTemplate}
                        source={{uri: productPic}}
                    />
                ) : (
                    <View style={stockStyles.imgTemplate}/>
                )}
                <TouchableOpacity
                    style={authentificationStyles.button}
                    onPress={updatePic}
                >
                    <Text style={authentificationStyles.buttonText}>Bild hochladen</Text>
                </TouchableOpacity>
                <Text style={commonStyles.title}>Titel *</Text>
                <CustomTextInput
                    placeholder={title}
                    onChangeInput={(input) => setTitle(input)}
                    mandatory={true}
                    edit={true}
                />
                <Text style={commonStyles.title}>Kategorie *</Text>
                <CustomDropdownInput
                    defaultSelection={category}
                    list={offerCategories}
                    onChangeInput={(input) => setCategory(input)}
                />
                <Text style={commonStyles.title}>Quantität *</Text>
                <CustomTextInput
                    placeholder={quantity}
                    onChangeInput={(input) => setQuantity(input)}
                    mandatory={true}
                    edit={true}
                />
                <Text style={commonStyles.title}>Art des Angebots *</Text>
                <CustomDropdownInput
                    defaultSelection={priceType}
                    list={offerTypes}
                    onChangeInput={(input) => {
                        setPriceType(input);
                        setPrice(input === "TRADE" ? "" : 0);
                    }}
                />
                <Text style={commonStyles.title}>
                    {priceType === 'TRADE' ? "Tauschobjekt *" : "Preis *"}
                </Text>
                {priceType === 'TRADE' ? (
                    <CustomTextInput
                        placeholder={price}
                        onChangeInput={(input) => setPrice(input)}
                        mandatory={true}
                        edit={true}
                    />
                ) : (
                    <CurrencyInput
                        style={authentificationStyles.inputRegular}
                        value={price}
                        onChangeValue={(input) => {
                            setPrice(input);
                        }}
                        suffix={"€"}
                        delimiter={"."}
                        separator={","}
                        precision={2}
                        minValue={0}
                        editable={priceType !== 'GIFT'}
                    />
                )}
                <Text style={commonStyles.title}>Beschreibung</Text>
                <TextInput
                    editable
                    multiline
                    numberOfLines={5}
                    maxLength={255}
                    onChangeText={(input) => setDescription(input)}
                    value={description}
                    style={authentificationStyles.inputRegular}
                />
                <TouchableOpacity
                    style={stockStyles.button}
                    onPress={update}
                >
                    <Text style={authentificationStyles.buttonText}>Änderungen speichern</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default EditStockScreen;