import React, {useEffect, useState} from "react";
import { IconButton, Menu, List } from 'react-native-paper';
import Slider from "@react-native-community/slider";
import {offerCategories, offerTypes, offerStatus} from "../../utils/constants";
import CheckboxFilter from "./CheckboxFilter";
import {useIsFocused, useNavigation} from "@react-navigation/native";

const Filter = ({filterParams, updateFilter}) => {
    const navigation = useNavigation();

    const searchRadiusVisible = Object.hasOwn(filterParams, 'searchRadius');
    const statusVisible = Object.hasOwn(filterParams, "status");

    const [isMenuVisible, setMenuVisible] = React.useState(false);
    const [searchRadius, setSearchRadius] = useState(searchRadiusVisible ? filterParams.searchRadius : null);
    const [selectedTypes, setSelectedTypes] = useState(filterParams.types);
    const [selectedCategories, setSelectedCategories] = useState(filterParams.categories);
    const [selectedStatus, setSelectedStatus] = useState(statusVisible ? filterParams.status : null);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    useEffect(() => {
        updateFilter({
            searchRadius: searchRadius,
            types: selectedTypes,
            categories: selectedCategories,
            status: selectedStatus
        });

    }, [searchRadius, selectedTypes, selectedCategories, selectedStatus]);

    /**
     * Resets filter selection to empty to ensure that both request and UI filter are empty on re-mount of the screen
     */
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSearchRadius(searchRadiusVisible ? 1 : null);
            setSelectedTypes([]);
            setSelectedCategories([]);
            setSelectedStatus(statusVisible ? [] : null);
        })
        return unsubscribe;
    }, [navigation]);

    const getDescription = (list) => {
        const labels = [];
        if(list === "cat"){
            selectedCategories.map(cat => {
                labels.push(offerCategories.find(e => e.value === cat).label)
            });
        }else if(list === "type"){
            selectedTypes.map(type => {
                labels.push(offerTypes.find(e => e.value === type).label)
            });
        }else{
            selectedStatus.map(type => {
                labels.push(offerStatus.find(e => e.value === type).label)
            });
        }
        return labels.join(', ');
    }

    return (
            <Menu
                visible={isMenuVisible}
                onDismiss={closeMenu}
                anchor={
                    <IconButton
                        icon="filter-variant"
                        onPress={openMenu}
                        color="#000"
                        size={28}
                    />
                }>
                <List.AccordionGroup key="id">
                    { searchRadiusVisible &&
                        <List.Accordion id="id1"
                            title="Entfernung"
                            description={searchRadius.toFixed(1) + ' km'} style={{width: 250}}>
                            <Slider
                                style={{width: 240, height: 40}}
                                minimumValue={0}
                                maximumValue={10}
                                lowerLimit={0.1}
                                step={0.1}
                                value={searchRadius}
                                onSlidingComplete={(val) => setSearchRadius(val)}
                                minimumTrackTintColor="#6FAB34"
                                maximumTrackTintColor="#6FAB34"
                            />
                        </List.Accordion>
                    }
                    <List.Accordion id="id2"
                                title="Angebotstyp"
                                description={getDescription("type")} style={{width: 250}}>
                        <CheckboxFilter
                            key="typeFilter"
                            checkboxList={offerTypes}
                            updateCheckboxList={(val) => setSelectedTypes(val)}
                            initialState={selectedTypes}
                        ></CheckboxFilter>
                    </List.Accordion>
                    <List.Accordion id="id3"
                                title="Kategorie"
                                description={getDescription("cat")} >
                        <CheckboxFilter
                            key="catFilter"
                            checkboxList={offerCategories}
                            updateCheckboxList={(val) => setSelectedCategories(val)}
                            initialState={selectedCategories}
                        ></CheckboxFilter>
                    </List.Accordion>
                    {statusVisible &&
                        <List.Accordion id="id4"
                                        title="Status"
                                        description={getDescription("status")} >
                            <CheckboxFilter
                                key="statusFilter"
                                checkboxList={offerStatus}
                                updateCheckboxList={(val) => setSelectedStatus(val)}
                                initialState={selectedStatus}
                            ></CheckboxFilter>
                        </List.Accordion>
                    }
                </List.AccordionGroup>
            </Menu>
    )
}
export default Filter;