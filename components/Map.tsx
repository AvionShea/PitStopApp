import { icons } from "@/constants";
import { useFetch } from "@/lib/fetch";
import { calculateEmployeeTimes, calculateRegion, generateMarkersFromData } from "@/lib/map";
import { useEmployeeStore, useLocationStore } from "@/store";
import { MarkerData } from "@/types/type";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps"
import MapViewDirections from "react-native-maps-directions";

const Map = () => {
    const { data: employees, loading, error } = useFetch<Employee[]>("/(api)/employees")
    const {
        userLongitude,
        userLatitude,
        employeeLatitude,
        employeeLongitude,
        destinationLatitude,
        destinationLongitude,
    } = useLocationStore();

    const { selectedEmployee, setEmployees } = useEmployeeStore();
    const [markers, setMarkers] = useState<MarkerData[]>([]);


    const region = calculateRegion({
        userLongitude,
        userLatitude,
        employeeLatitude,
        employeeLongitude,
        destinationLatitude,
        destinationLongitude,
    });

    useEffect(() => {

        if (Array.isArray(employees)) {
            if (!userLatitude || !userLongitude) return;

            const newMarkers = generateMarkersFromData({
                data: employees,
                userLatitude,
                userLongitude
            });

            setMarkers(newMarkers);
        }
    }, [employees, userLatitude, userLongitude]);

    useEffect(() => {
        if (markers.length > 0 && destinationLatitude && destinationLongitude) {
            calculateEmployeeTimes({
                markers,
                userLatitude,
                userLongitude,
                destinationLatitude,
                destinationLongitude,
            }).then((employees) => {
                setEmployees(employees as MarkerData[]);
            });
        }
    }, [markers, destinationLatitude, destinationLongitude]);

    if (loading || (!userLatitude || !userLongitude)) {
        return (
            <View className="flex justify-between items-center w-full">
                <ActivityIndicator size="small" color="#000" />
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex justify-between items-center w-full">
                <Text>Error: {error} </Text>
            </View>
        );
    }

    return (
        <MapView
            provider={PROVIDER_DEFAULT}
            className="w-full h-full rounded-2xl"
            mapType="standard"
            showsPointsOfInterest={false}
            initialRegion={region}
            showsUserLocation={true}
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

            {destinationLatitude && destinationLongitude && (
                <>
                    <Marker
                        key="destination"
                        coordinate={{
                            latitude: destinationLatitude,
                            longitude: destinationLongitude,
                        }}
                        title="Destination"
                        image={icons.pin}
                    />
                    <MapViewDirections
                        origin={{
                            latitude: userLatitude!,
                            longitude: userLongitude!,
                        }}
                        destination={{
                            latitude: destinationLatitude,
                            longitude: destinationLongitude,
                        }}
                        apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY}
                        strokeColor="#0286FF"
                        strokeWidth={2}
                    />
                </>
            )}

        </MapView>
    )
}

export default Map;