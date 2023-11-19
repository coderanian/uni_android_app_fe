import {Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import CustomTextInput from "../../components/Input/CustomTextInput";
import {authentificationStyles, commonStyles, profileStyles, stockStyles} from "../../assets/styles/commonStyles";
import {accessCamera} from "../../services/accessCamera";
import {offerCategories, offerTypes} from '../../utils/constants'
import CustomDropdownInput from "../../components/Input/CustomDropdownInput";
import CurrencyInput from "react-native-currency-input";
import {useAuth} from "../../context/AuthContext";

const AddStockScreen = ({navigation}) => {
    const {onPostOffer, onLogout} = useAuth();
    const [title, setTitle] = useState(null);
    const [category, setCategory] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [description, setDescription] = useState(null);
    const [priceType, setPriceType] = useState(null);
    const [price, setPrice] = useState(null);
    const [productPic, setProductPic] = useState(null);

    const create = async () => {
        if(!title || !category || !quantity || !priceType || price === null){
            Alert.alert("Fehler", "Bitte überprüfe deine Eingaben!");
        } else {
            const result = await onPostOffer(title, description, category, quantity, priceType, price, productPic)
            if(result && result.error){
                if (result.status.toString() === '403') {
                    onLogout();
                    Alert.alert("Login","Login abgelaufen.")
                }else{
                    Alert.alert(result.status, result.msg);
                }
            } else {
                navigation.goBack();
                Alert.alert("Neues Angebot", "Angebot erfolgreich erstell!")
            }
        }
    }
    /**
     * Ensure that picture state is updated after fetching location
     * @author Konstantin K.
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
                        style={profileStyles.imgEditContainer}
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
                    placeholder={"Bier"}
                    onChangeInput={(input) => setTitle(input)}
                    mandatory={true}
                />
                <Text style={commonStyles.title}>Kategorie *</Text>
                <CustomDropdownInput
                    list={offerCategories}
                    onChangeInput={(input) => setCategory(input)}
                />
                <Text style={commonStyles.title}>Quantität *</Text>
                <CustomTextInput
                    placeholder={"3 Flaschen"}
                    onChangeInput={(input) => setQuantity(input)}
                    mandatory={true}
                />
                <Text style={commonStyles.title}>Art des Angebots *</Text>
                <CustomDropdownInput
                    list={offerTypes}
                    onChangeInput={(input) => {
                        setPriceType(input);
                        setPrice(input === "TRADE" ? "" : 0);
                        console.log(price);
                    }}
                />
                <Text style={commonStyles.title}>
                    {priceType === 'TRADE' ? "Tauschobjekt *" : "Preis *"}
                </Text>
                {priceType === 'TRADE' ? (
                    <CustomTextInput
                        placeholder={"3 Flaschen Vodka"}
                        onChangeInput={(input) => setPrice(input)}
                        mandatory={true}
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
                    placeholder={"Sehr lecker!"}
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
                    onPress={create}
                >
                    <Text style={authentificationStyles.buttonText}>Angebot erstellen</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default AddStockScreen;