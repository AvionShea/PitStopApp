import { icons } from "@/constants";
import { calculateRegion, generateMarkersFromData } from "@/lib/map";
import { useEmployeeStore, useLocationStore } from "@/store";
import { MarkerData } from "@/types/type";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps"

const pitStopEmployees = [
    {
        "id": "1",
        "first_name": "James",
        "last_name": "Wilson",
        "profile_image_url": "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
        "car_image_url": "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
        "company_vehicle_id": 4,
        "company_license_plate": "OLS-7192"
    },
]

const Map = () => {
    const {
        userLongitude,
        userLatitude,
        destinationLatitude,
        destinationLongitude,
    } = useLocationStore();

    const { selectedEmployee, setEmployees } = useEmployeeStore();
    const [markers, setMarkers] = useState<MarkerData[]>([]);


    const region = calculateRegion({
        userLongitude,
        userLatitude,
        destinationLatitude,
        destinationLongitude,
    });

    useEffect(() => {
        if (Array.isArray(pitStopEmployees)) {
            if (!userLatitude || !userLongitude) return;

            const newMarkers = generateMarkersFromData({
                data: pitStopEmployees,
                userLatitude,
                userLongitude
            });

            setMarkers(newMarkers);
        };
    }, [pitStopEmployees])

    return (
        <MapView
            provider={PROVIDER_DEFAULT}
            className="w-full h-full rounded-2xl"
            mapType="standard"
            showsPointsOfInterest={false}
            initialRegion={region}
            showsUserLocation={true}
            userInterfaceStyle="dark"
        >
            {markers.map((marker) => (
                <Marker
                    key={marker.id}
                    coordinate={{
                        latitude: marker.latitude,
                        longitude: marker.longitude
                    }}
                    title={marker.title}
                    image={
                        selectedEmployee === marker.id ? icons.selectedMarker : icons.marker
                    }
                />
            ))}
        </MapView>
    )
}

export default Map;