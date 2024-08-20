import { Delivery } from "@/types/type";
import { icons } from "@/constants";
import { formatDate, formatTime } from "@/lib/utils";
import { Image, Text, View } from "react-native";

const DeliveryCard = ({ delivery: {
    destination_address,
    destination_latitude,
    destination_longitude,
    created_at,
    order_delivery_time,
    driver,
    driver_location,
    payment_status,
    action_status,
},
}: {
    delivery: Delivery;
}) => (
    <View className="flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3">
        <View className="flex flex-col items-start justify-center p-3">
            <View className="flex flex-row items-center justify-between">
                <Image
                    source={{
                        uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`
                    }}
                    className="w-[80px] h-[90px] rounded-lg"
                />

                <View className="flex flex-col mx-5 gap-y-5 flex-1">
                    <View className="flex flex-row items-center gap-x-2">
                        <Image source={icons.to} className="w-5 h-5" />
                        <Text className="text-md font-JakartaMedium" numberOfLines={1}>
                            {driver_location}
                        </Text>
                    </View>

                    <View className="flex flex-row items-center gap-x-2">
                        <Image source={icons.point} className="w-5 h-5" />
                        <Text className="text-md font-JakartaMedium" numberOfLines={1}>
                            {destination_address}
                        </Text>
                    </View>
                </View>
            </View>

            <View className="flex flex-col w-full mt-5 bg-general-500 rounded-lg p-3 items-start justify-center">

                <View className="flex flex-row items-center w-full justify-between mb-5">
                    <Text className="text-md font-JakartaMedium text-gray-500">Date & Est. Delivery Time</Text>
                    <Text className="text-md font-JakartaMedium text-gray-500">{formatDate(created_at)}, {formatTime(order_delivery_time)}
                    </Text>
                </View>

                <View className="flex flex-row items-center w-full justify-between mb-5">
                    <Text className="text-md font-JakartaMedium text-gray-500">Company Driver</Text>
                    <Text className="text-md font-JakartaMedium text-gray-500">{driver.first_name} {driver.last_name}
                    </Text>
                </View>

                <View className="flex flex-row items-center w-full justify-between mb-5">
                    <Text className="text-md font-JakartaMedium text-gray-500">Vehicle ID</Text>
                    <Text className="text-md font-JakartaMedium text-gray-500">{driver.vehicle_id}
                    </Text>
                </View>

                <View className="flex flex-row items-center w-full justify-between mb-5">
                    <Text className="text-md font-JakartaMedium text-gray-500">Vehicle License Plate</Text>
                    <Text className="text-md font-JakartaMedium text-gray-500">{driver.company_license_plate}
                    </Text>
                </View>

                <View className="flex flex-row items-center w-full justify-between mb-5">
                    <Text className="text-md font-JakartaMedium text-gray-500">Payment Status</Text>
                    <Text className={`text-md capitalize font-JakartaMedium  ${payment_status === "paid" ? "text-green-500" : payment_status === "canceled" ? "text-red-500" : "text-gray-500"}`}>{payment_status}
                    </Text>
                </View>

                <View className="flex flex-row items-center w-full justify-between mb-5">
                    <Text className="text-md font-JakartaMedium text-gray-500">Action Status</Text>
                    <Text className={`text-md capitalize font-JakartaMedium ${action_status === "completed" ? "text-green-500" : action_status === "canceled" ? "text-red-500" : "text-gray-500"}`}>{action_status}
                    </Text>
                </View>

            </View>
        </View>
    </View>
);

export default DeliveryCard;