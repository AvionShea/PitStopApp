import { icons } from "@/constants";
import { formatTravelTime } from "@/lib/utils";
import { EmployeeCardProps } from "@/types/type";
import { Image, Text, TouchableOpacity, View } from "react-native";

const EmployeeCard = ({ item, selected, setSelected }: EmployeeCardProps) => {
    return (
        <TouchableOpacity
            onPress={setSelected}
            className={`${selected === item.id ? "bg-general-600" : "bg-white"
                } flex flex-row items-center justify-between py-5 px-3 rounded-xl`}
        >
            <Image
                source={{ uri: item.profile_image_url }}
                className="w-14 h-14 rounded-full"
            />

            <View className="flex-1 flex flex-col items-start justify-center mx-3">
                <View className="flex flex-row items-center justify-start mb-1">
                    <Text className="text-lg font-JakartaRegular">{item.title}</Text>
                </View>

                <View className="flex flex-row items-center justify-start">

                    <Text className="text-sm font-JakartaRegular text-general-800 mx-1">
                        |
                    </Text>

                    <Text className="text-sm font-JakartaRegular text-general-800">
                        {formatTravelTime(item.travel_time!)}
                    </Text>
                </View>
            </View>

            <Image
                source={{ uri: item.car_image_url }}
                className="h-14 w-14"
                resizeMode="contain"
            />
        </TouchableOpacity>
    );
};

export default EmployeeCard;