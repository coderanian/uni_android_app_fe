import React from "react";
import {profileStyles} from "../assets/styles/commonStyles";
import MapView, {Marker} from "react-native-maps";
const MapComponent = ({location}) => {

    const region = {
        latitude: location?.latitude ?? 0,
        longitude: location?.longitude ?? 0,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    }

    return (
        <MapView
            style={profileStyles.mapContainer}
            region={region}
        >
            <Marker
                coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                }}
            />
        </MapView>
    )
}
export default MapComponent;
