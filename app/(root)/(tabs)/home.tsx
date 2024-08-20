import DeliveryCard from '@/components/DeliveryCard'
import GoogleTextInput from '@/components/GoogleTextInput'
import Map from '@/components/Map'
import { icons, images } from '@/constants'
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const recentDeliveries = [
    {
        "order_id": "1",
        "driver_location": "Capital Blvd, Raleigh, NC 27604",
        "driver_latitude": "35.8373261",
        "driver_longitude": "-78.5811642",
        "fuel_grade": "91",
        "fuel_price": "3.18",
        "gallons_pumped": "13",
        "destination_address": "W. Peace St., Raleigh, NC 27610",
        "destination_latitude": "35.7886678",
        "destination_longitude": "-78.6506771",
        "car_make": "",
        "car_model": "",
        "car_color": "",
        "car_license_plate": "",
        "order_delivery_time": 30,
        "delivery_price": "19500.00",
        "payment_status": "paid",
        "card_used": "7412",
        "action_status": "completed",
        "driver_id": 2,
        "user_id": "1",
        "created_at": "2024-08-11 05:19:20.620007",
        "driver": {
            "driver_id": "2",
            "first_name": "David",
            "last_name": "Brown",
            "profile_image_url": "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
            "vehicle_image_url": "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
            "vehicle_id": 5,
            "company_license_plate": "OLS-7192",
        }
    },
]

export default function Page() {
    const { user } = useUser();
    const loading = false;

    const handleSignOut = () => { };
    const handleDestinationPress = () => { };

    return (
        <SafeAreaView className='bg-general-500'>
            <FlatList
                data={recentDeliveries?.slice(0, 5)}
                renderItem={({ item }) => <DeliveryCard delivery={item} />}
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
                                    alt="No recent deliveries found"
                                    resizeMode="contain"
                                />
                                <Text className="text-lg">No recent deliveries found</Text>
                            </>
                        ) : (
                            <ActivityIndicator size="large" color="#000" />
                        )}
                    </View>
                )}
                ListHeaderComponent={() => (
                    <>
                        <View className='flex flex-row items-center justify-between my-5'>
                            <Text className='text-2xl capitalize font-JakartaExtraBold'>
                                Welcome, {user?.firstName || user?.emailAddresses[0].emailAddress.split("@")[0]}!
                            </Text>
                            <TouchableOpacity onPress={handleSignOut} className='justify-center items-center w-10 h-10 rounded-full bg-white'>
                                <Image source={icons.out} className='w-5 h-5' />
                            </TouchableOpacity>
                        </View>

                        <GoogleTextInput
                            icon={icons.search}
                            containerStyle="bg-white shadow-md shadow-neutral-300"
                            handlePress={handleDestinationPress}
                        />

                        <>
                            <Text className='text-xl font-JakartaBold mt-5 mb-3'>
                                Your Current Location
                            </Text>
                            <View className='flex flex-row items-center bg-transparent h-[300px]'>
                                <Map />
                            </View>
                        </>

                        <Text className='text-xl font-JakartaBold mt-5 mb-3'>
                            Recent Deliveries
                        </Text>

                    </>
                )}
            />
        </SafeAreaView>
    )
};