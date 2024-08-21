import PastDeliveryCard from "@/components/PastDeliveryCard";
import { images } from "@/constants";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const recentDeliveries = [
    {
        "order_id": "1",
        "fuel_grade": "91",
        "fuel_price": "$3.18",
        "gallons_pumped": "13",
        "destination_address": "W. Peace St., Raleigh, NC 27610",
        "destination_latitude": "35.7886678",
        "destination_longitude": "-78.6506771",
        "customer_car_make": "BMW",
        "customer_car_model": "M5",
        "customer_car_color": "Isle of Man Green",
        "customer_license_plate": "CatchMe",
        "estimated_order_delivery_time": 30,
        "actual_order_delivery_time": "1:30 AM",
        "delivery_price": "$45.00",
        "payment_status": "paid",
        "customer_card_used": "XX-7412",
        "action_status": "completed",
        "user_id": "1",
        "created_at": "2024-08-11 05:19:20.620007",
        "employee": {
            "employee_id": "2",
            "first_name": "David",
            "last_name": "Brown",
            "profile_image_url": "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
            "vehicle_image_url": "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
            "company_vehicle_id": 5,
            "company_license_plate": "OLS-7192",
            "location": "Capital Blvd, Raleigh, NC 27604",
            "latitude": "35.8373261",
            "longitude": "-78.5811642",
        }
    },
]

const Deliveries = () => {
    const loading = false;
    return (
        <SafeAreaView className='bg-purple-100'>
            <FlatList
                data={recentDeliveries}
                renderItem={({ item }) => <PastDeliveryCard delivery={item} />}
                className='px-5'
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
                ListEmptyComponent={() => (
                    <View className='flex flex-col items-center justify-center'>
                        {!loading ? (
                            <>
                                <Image
                                    source={images.noResult}
                                    className="w-40 h-40"
                                    alt="No past deliveries"
                                    resizeMode="contain"
                                />
                                <Text className="text-lg">No past deliveries</Text>
                            </>
                        ) : (
                            <ActivityIndicator size="large" color="#000" />
                        )}
                    </View>
                )}
                ListHeaderComponent={() => (
                    <>
                        <Text className='text-xl font-JakartaBold mt-5 mb-3'>
                            Past Deliveries
                        </Text>

                    </>
                )}
            />
        </SafeAreaView>
    )
};

export default Deliveries;