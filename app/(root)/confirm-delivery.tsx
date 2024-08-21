import CustomButton from "@/components/CustomButton";
import DeliveryLayout from "@/components/DeliveryLayout";
import EmployeeCard from "@/components/EmployeeCard";
import { icons } from "@/constants";
import { router } from "expo-router";
import { children } from "react";
import { Image, Text, View, TouchableOpacity, FlatList } from "react-native";

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

const ConfirmDelivery = () => {
    return (
        <DeliveryLayout title="Choose a PitStop Employee" snapPoints={["65%, 85%"]}>
            <FlatList data={pitStopEmployees} renderItem={({ item }) => (
                <EmployeeCard />
            )} />
            <CustomButton title="Confirm Order" />
        </DeliveryLayout>
    );
};

export default ConfirmDelivery;