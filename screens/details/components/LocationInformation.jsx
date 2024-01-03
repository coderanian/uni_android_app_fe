import React from "react";
import MapComponent from "../../../components/MapComponent";

const LocationInformation = ({route}) => {
    const location = route.params.location;

    return (
        <MapComponent location={location}></MapComponent>
    )
};
export default LocationInformation;