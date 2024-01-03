import React, {useEffect, useState} from "react";
import { IconButton, Menu, List } from 'react-native-paper';
import Slider from "@react-native-community/slider";
import {offerCategories, offerTypes} from "../../utils/constants";
import CheckboxFilter from "./CheckboxFilter";

const Filter = ({filterParams, updateFilter}) => {
    const [isMenuVisible, setMenuVisible] = React.useState(false);

    const searchRadiusVisible = Object.hasOwn(filterParams, 'searchRadius');

    const [searchRadius, setSearchRadius] = useState(searchRadiusVisible ? filterParams.searchRadius : null);
    const [selectedTypes, setSelectedTypes] = useState(filterParams.types);
    const [selectedCategories, setSelectedCategories] = useState(filterParams.categories);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);



    useEffect(() => {
        updateFilter({
            searchRadius: searchRadius,
            types: selectedTypes,
            categories: selectedCategories
        });

    }, [searchRadius, selectedTypes, selectedCategories]);


    const getCatDescription = () => {
        const labels = [];
        selectedCategories.map(cat => {
            labels.push(offerCategories.find(e => e.value === cat).label)
        });
        return labels.join(', ');
    }
    const getTypeDescription = () => {
        const labels = [];
        selectedTypes.map(type => {
            labels.push(offerTypes.find(e => e.value === type).label)
        });
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
                                description={getTypeDescription()} style={{width: 250}}>
                        <CheckboxFilter
                            key="typeFilter"
                            checkboxList={offerTypes}
                            updateCheckboxList={(val) => setSelectedTypes(val)}
                            initialState={selectedTypes}
                        ></CheckboxFilter>
                    </List.Accordion>
                    <List.Accordion id="id3"
                                title="Kategorie"
                                description={getCatDescription()} >
                        <CheckboxFilter
                            key="catFilter"
                            checkboxList={offerCategories}
                            updateCheckboxList={(val) => setSelectedCategories(val)}
                            initialState={selectedCategories}
                        ></CheckboxFilter>
                    </List.Accordion>
                </List.AccordionGroup>
            </Menu>
    )
}
export default Filter;