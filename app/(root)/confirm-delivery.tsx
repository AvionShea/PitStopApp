import CustomButton from "@/components/CustomButton";
import DeliveryLayout from "@/components/DeliveryLayout";
import EmployeeCard from "@/components/EmployeeCard";
import { icons } from "@/constants";
import { useEmployeeStore } from "@/store";
import { router } from "expo-router";
import { Image, Text, View, TouchableOpacity, FlatList } from "react-native";


const ConfirmDelivery = () => {
    const { employees, selectedEmployee, setSelectedEmployee } = useEmployeeStore();

    return (
        <DeliveryLayout title="Choose a PitStop Employee" snapPoints={["65%, 85%"]}>
            <FlatList
                data={employees}
                renderItem={({ item }) => (
                    <EmployeeCard selected={selectedEmployee!} setSelected={() => setSelectedEmployee(Number(item.id)!)} item={item} />)}
                ListFooterComponent={() => (
                    <View className="mx-5 mt-10">
                        <CustomButton title="Select Employee" onPress={() => router.push("/(root)/book-delivery")} />
                    </View>
                )}
            />
        </DeliveryLayout>
    );
};

export default ConfirmDelivery;