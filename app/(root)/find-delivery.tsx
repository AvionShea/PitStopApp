import CustomButton from "@/components/CustomButton";
import DeliveryLayout from "@/components/DeliveryLayout";
import GoogleTextInput from "@/components/GoogleTextInput";
import { icons } from "@/constants";
import { useLocationStore } from "@/store";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FindDelivery = () => {
    const {
        userAddress,
        destinationAddress,
        setDestinationLocation,
        setUserLocation,
    } = useLocationStore();
    return (
        <DeliveryLayout title="Delivery">
            <View className="my-3">
                <Text className="text-lg font-JakartaSemiBold mb-3">Current Location: </Text>
                <GoogleTextInput
                    icon={icons.target}
                    initialLocation={userAddress!}
                    containerStyle="bg-neutral-100"
                    textInputBackgroundColor="#F5F5F5"
                    handlePress={(location) => setUserLocation(location)}
                />
            </View>
            <View className="my-3">
                <Text className="text-lg font-JakartaSemiBold mb-3">Delivery Location: </Text>
                <GoogleTextInput
                    icon={icons.map}
                    initialLocation={destinationAddress!}
                    containerStyle="bg-neutral-100"
                    textInputBackgroundColor="transparent"
                    handlePress={(location) => setDestinationLocation(location)}
                />
            </View>

            <CustomButton title="Find now" onPress={() => router.push("/(root)/confirm-delivery")} className="mt-5" />

        </DeliveryLayout>
    );
};

export default FindDelivery;