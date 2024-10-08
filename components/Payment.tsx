import { useAuth } from "@clerk/clerk-expo";
import { useStripe } from "@stripe/stripe-react-native";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";

import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import { useLocationStore } from "@/store";
import { PaymentProps } from "@/types/type";

const Payment = ({
    firstName,
    lastName,
    email,
    total,
    employeeId,
}: PaymentProps) => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const {
        destinationLatitude,
        destinationAddress,
        destinationLongitude,
    } = useLocationStore();

    const { userId } = useAuth();
    const [success, setSuccess] = useState<boolean>(false);

    const openPaymentSheet = async () => {
        await initializePaymentSheet();

        const { error } = await presentPaymentSheet();

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            setSuccess(true);
        }
    };

    const initializePaymentSheet = async () => {
        const { error } = await initPaymentSheet({
            merchantDisplayName: "PitStop",
            intentConfiguration: {
                mode: {
                    amount: parseFloat(`${total}`) * 100,
                    currencyCode: "usd",
                },
                confirmHandler: async (
                    paymentMethod,
                    shouldSavePaymentMethod,
                    intentCreationCallback,
                ) => {
                    const { paymentIntent, customer } = await fetchAPI(
                        "/(api)/(stripe)/create",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                name: firstName && lastName || email.split("@")[0],
                                email: email,
                                amount: total,
                                payment_method_id: paymentMethod.id
                            }),
                        },
                    );

                    if (paymentIntent.client_secret) {
                        const { result } = await fetchAPI("/(api)/(stripe)/pay", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                payment_method_id: paymentMethod.id,
                                payment_intent_id: paymentIntent.id,
                                customer_id: customer,
                                client_secret: paymentIntent.client_secret
                            }),
                        });

                        if (result.client_secret) {
                            await fetchAPI("/(api)/delivery/create", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    destination_address: destinationAddress,
                                    destination_latitude: destinationLatitude,
                                    destination_longitude: destinationLongitude,
                                    surcharge_price: parseFloat(`${total}`) * 100,
                                    payment_status: "paid",
                                    employee_id: employeeId,
                                    user_id: userId
                                }),
                            });

                            intentCreationCallback({
                                clientSecret: result.client_secret
                            });
                        }
                    }
                },
            },
            returnURL: "myapp://book-delivery",
        });

        if (!error) {
            // setLoading(true);
        }
    };

    return (
        <>
            <CustomButton
                title="Confirm Delivery"
                className="my-10"
                onPress={openPaymentSheet}
            />

            <ReactNativeModal
                isVisible={success}
                onBackdropPress={() => setSuccess(false)}
            >
                <View className="flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
                    <Image source={images.check} className="w-28 h-28 mt-5" />

                    <Text className="text-2xl text-center font-JakartaBold mt-5">
                        Delivery placed successfully!
                    </Text>

                    <Text className="text-md text-general-200 font-JakartaRegular text-center mt-3">
                        Thank you for your booking. Your delivery order has been successfully
                        placed. Please proceed with your day.
                    </Text>

                    <CustomButton
                        title="Back Home"
                        onPress={() => {
                            setSuccess(false);
                            router.push("/(root)/(tabs)/home");
                        }}
                        className="mt-5"
                    />
                </View>
            </ReactNativeModal>
        </>
    );
};

export default Payment;