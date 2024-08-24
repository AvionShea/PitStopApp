import DeliveryLayout from "@/components/DeliveryLayout";
import Payment from "@/components/Payment";
import { icons } from "@/constants";
import { formatTime, formatTravelTime } from "@/lib/utils";
import { useDeliveryStore, useEmployeeStore, useLocationStore } from "@/store";
import { Image, Text, View } from "react-native";

import { StripeProvider } from '@stripe/stripe-react-native';
import { useUser } from "@clerk/clerk-expo";


const BookDelivery = () => {
    const { user } = useUser();
    const { destinationAddress } = useLocationStore();
    const { employees, selectedEmployee } = useEmployeeStore();
    const { fuel_grade, fuel_price, customer_card_used, gallons_pumped } = useDeliveryStore();

    const employeeDetails = employees?.filter(
        (employee) => +employee.id === selectedEmployee,
    )[0];

    return (
        <StripeProvider
            publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
            merchantIdentifier="merchant.pitstop.com" // required for Apple Pay
            urlScheme="myapp" // required for 3D Secure and bank redirects
        >
            <DeliveryLayout title="Book Delivery" snapPoints={["45%", "85%"]}>
                <>
                    <Text className="text-xl font-JakartaSemiBold mb-3">
                        Delivery Information
                    </Text>

                    <View className="flex flex-col w-full items-center justify-center mt-10">
                        <Image
                            source={{ uri: employeeDetails?.profile_image_url }}
                            className="w-28 h-28 rounded-full"
                        />

                        <View className="flex flex-row items-center justify-center mt-5 space-x-2">
                            <Text className="text-lg font-JakartaSemiBold">
                                {employeeDetails?.title}
                            </Text>
                        </View>
                    </View>

                    <View
                        className="flex flex-col w-full items-start justify-center py-3 px-5 rounded-3xl bg-general-600 mt-5">

                        <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
                            <Text className="text-lg font-JakartaRegular">Delivery Price</Text>
                            <Text className="text-lg font-JakartaRegular text-[#0CC25F]">
                                ${employeeDetails?.surcharge_price}
                            </Text>
                        </View>

                        <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
                            <Text className="text-lg font-JakartaRegular">Travel Time</Text>
                            <Text className="text-lg font-JakartaRegular">
                                {formatTravelTime(parseInt(`${employeeDetails?.time}`))}
                            </Text>
                        </View>

                        <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
                            <Text className="text-lg font-JakartaRegular">Est. Delivery Time</Text>
                            <Text className="text-lg font-JakartaRegular">
                                {formatTime(parseInt(`${employeeDetails?.time}`))}
                            </Text>
                        </View>

                        <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
                            <Text className="text-lg font-JakartaRegular">Company Vehicle License Plate</Text>
                            <Text className="text-lg font-JakartaRegular">
                                {employeeDetails?.company_license_plate}
                            </Text>
                        </View>
                    </View>

                    <View className="flex flex-col w-full items-start justify-center mt-5">

                        <View className="flex flex-row items-center justify-start border-b border-general-700 mt-1 w-full py-3">
                            <Image source={icons.point} className="w-6 h-6" />
                            <Text className="text-lg font-JakartaRegular ml-2">
                                {destinationAddress}
                            </Text>
                        </View>
                    </View>
                    <Payment
                        fullName={user?.fullName!}
                        email={user?.emailAddresses[0].emailAddress!}
                        total={employeeDetails?.surcharge_price}
                        employeeId={employeeDetails?.id}
                        arrivalTime={employeeDetails?.time}
                        fuelGrade={`${fuel_grade}`}
                        fuelPrice={`${fuel_price}`}
                        gallonsPumped={Number(gallons_pumped)}
                        cardNumber={`${customer_card_used}`}
                    />
                </>
            </DeliveryLayout>
        </StripeProvider>
    );
};

export default BookDelivery;