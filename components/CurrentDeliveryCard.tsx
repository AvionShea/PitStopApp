import { Delivery } from "@/types/type";
import { icons } from "@/constants";
import { completeDelivery, formatDate, formatTime } from "@/lib/utils";
import { Image, Text, View } from "react-native";

const CurrentDeliveryCard = ({ delivery: {
    destination_address,
    destination_latitude,
    destination_longitude,
    created_at,
    estimated_order_delivery_time,
    actual_order_delivery_time,
    driver,
    payment_status,
    action_status,
    customer_car_make,
    customer_car_model,
    customer_car_color,
    customer_license_plate,
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

                    {/* DRIVER'S LOCATION (OPTIONAL) <View className="flex flex-row items-center gap-x-2">
                        <Image source={icons.to} className="w-5 h-5" />
                        <Text className="text-md font-JakartaMedium" numberOfLines={1}>
                            {driver.employee_location}
                        </Text>
                    </View>*/}

                    {/* GAS DELIVERY LOCATION */}
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
                    <Text className="text-md font-JakartaMedium text-gray-500">{`Date & ${action_status === "completed" ? "Time Delivered" : action_status === "canceled" ? "Time Canceled" : "Est. Delivery Time"}`}</Text>
                    <Text className="text-md font-JakartaMedium text-gray-500">{`${formatDate(created_at)}, ${action_status === "completed" ? completeDelivery() : action_status === "canceled" ? completeDelivery() : formatTime(estimated_order_delivery_time)}`}
                    </Text>
                </View>

                <View className="flex flex-row items-center w-full justify-between mb-5">
                    <Text className="text-md font-JakartaMedium text-gray-500">PitStop Driver</Text>
                    <Text className="text-md font-JakartaMedium text-gray-500">{driver.first_name} {driver.last_name}
                    </Text>
                </View>


                <View className="flex flex-row items-center w-full justify-between mb-5">
                    <Text className="text-md font-JakartaMedium text-gray-500">Customer Vehicle Make</Text>
                    <Text className="text-md font-JakartaMedium text-gray-500">{customer_car_make}
                    </Text>
                </View>

                <View className="flex flex-row items-center w-full justify-between mb-5">
                    <Text className="text-md font-JakartaMedium text-gray-500">Customer Vehicle Model</Text>
                    <Text className="text-md font-JakartaMedium text-gray-500">{customer_car_model}
                    </Text>
                </View>

                <View className="flex flex-row items-center w-full justify-between mb-5">
                    <Text className="text-md font-JakartaMedium text-gray-500">Customer Vehicle Color</Text>
                    <Text className="text-md font-JakartaMedium text-gray-500">{customer_car_color}
                    </Text>
                </View>

                <View className="flex flex-row items-center w-full justify-between mb-5">
                    <Text className="text-md font-JakartaMedium text-gray-500">Customer License Plate</Text>
                    <Text className="text-md font-JakartaMedium text-gray-500">{customer_license_plate}
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

export default CurrentDeliveryCard;