import { icons } from "@/constants";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Map from "./Map";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRef } from "react";

const DeliveryLayout = ({ snapPoints, title, children }: { title: string; children: React.ReactNode; snapPoints?: string[]; }) => {
    const bottomSheetRef = useRef<BottomSheet>(null)

    return (
        <GestureHandlerRootView>

            <View className="flex-1 bg-purple-100">
                <View className="flex flex-col bg-blue-500">
                    <View className="flex flex-row absolute z-10 top-16 items-center justify-start px-5">
                        <TouchableOpacity onPress={() => router.back()}>
                            <View className="w-10 h-10 bg-purple-200 rounded-full items-center justify-center">
                                <Image source={icons.backArrow} resizeMode="contain" className="w-6 h-6" />
                            </View>
                        </TouchableOpacity>
                        <Text className="text-xl font-JakartaSemiBold ml-5">
                            {title || "Go Back"}
                        </Text>
                    </View>
                    <Map />
                </View>
                <BottomSheet
                    ref={bottomSheetRef}
                    snapPoints={snapPoints || ["47%", "85%"]}
                    index={0}>
                    <BottomSheetView style={{ flex: 1, padding: 15 }}>
                        {children}
                    </BottomSheetView>
                </BottomSheet>
            </View>

        </GestureHandlerRootView>

    );
};

export default DeliveryLayout;