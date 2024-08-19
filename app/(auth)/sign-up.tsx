import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import { useSignUp } from "@clerk/clerk-expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import ReactNativeModal from "react-native-modal";


const SignUp = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
    });

    const [verification, setVerification] = useState({
        state: "default",
        error: "",
        code: "",
    });

    const onSignUpPress = async () => {
        if (!isLoaded) {
            return
        };

        try {
            await signUp.create({
                firstName: form.firstName,
                lastName: form.lastName,
                emailAddress: form.email,
                phoneNumber: form.phoneNumber,
                password: form.password,
            });

            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

            setVerification({
                ...verification,

                state: "pending",
            });
        } catch (err: any) {
            Alert.alert("Error", err.errors[0].longMessage);
        };
    };

    const onPressVerify = async () => {
        if (!isLoaded) return;

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code: verification.code,
            });

            if (completeSignUp.status === 'complete') {

                await fetchAPI("/(api)/user", {
                    method: "POST",
                    body: JSON.stringify({
                        firstName: form.firstName,
                        lastName: form.lastName,
                        email: form.email,
                        phoneNumber: form.phoneNumber,
                        clerkId: completeSignUp.createdUserId,
                    }),
                });

                await setActive({ session: completeSignUp.createdSessionId });
                setVerification({ ...verification, state: "success" });
            } else {
                setVerification({ ...verification, error: "Verification failed.", state: "failed" })
            }
        } catch (err: any) {
            setVerification({ ...verification, error: err.errors[0].longMessage, state: "failed" });
        };
    };

    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="relative w-full h-[135px]">
                    <Image
                        source={images.signUpCar}
                        className="z-0 w-full h-[130px]"
                    />
                    <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-0 left-3">
                        Create Your Account!
                    </Text>
                </View>

                <View className="p-3">
                    <InputField
                        label="First Name"
                        placeholder="Enter your first name"
                        icon={icons.person}
                        value={form.firstName}
                        onChangeText={(value) => setForm({ ...form, firstName: value })}
                    />
                    <InputField
                        label="Last Name"
                        placeholder="Enter your last name"
                        icon={icons.person}
                        value={form.lastName}
                        onChangeText={(value) => setForm({ ...form, lastName: value })}
                    />
                    <InputField
                        label="Email"
                        placeholder="Enter your email"
                        icon={icons.email}
                        value={form.email}
                        keyboardType="email-address"
                        onChangeText={(value) => setForm({ ...form, email: value })}
                    />
                    <InputField
                        label="Phone Number"
                        placeholder="Enter your phone number"
                        icon={icons.phone}
                        value={form.phoneNumber}
                        keyboardType="phone-pad"
                        onChangeText={(value) => setForm({ ...form, phoneNumber: value })}
                    />

                    <InputField
                        label="Password"
                        placeholder="Create a password"
                        icon={icons.lock}
                        secureTextEntry={!showPassword}
                        value={form.password}
                        onChangeText={(value) => setForm({ ...form, password: value })}
                    />
                    <TouchableOpacity >
                        <MaterialCommunityIcons
                            style={{
                                marginTop: -45,
                                marginBottom: 50,
                                marginLeft: 335,
                            }}
                            name={showPassword ? 'eye-off' : 'eye'}
                            size={25}
                            color="#aaa"
                            onPress={toggleShowPassword}
                        />
                    </TouchableOpacity>

                    <CustomButton title="Sign Up" onPress={onSignUpPress} className="w-full mt-15" />

                    <OAuth />

                    <Link href="/(auth)/sign-in"
                        className="text-lg text-center text-general-200 mt-5"
                    >
                        <Text>Already have an account?{" "}</Text>
                        <Text className="text-primary-500">Sign In</Text>
                    </Link>
                </View>

                <ReactNativeModal isVisible={verification.state === "pending"}
                    onModalHide={() => {
                        if (verification.state === "success") setShowSuccessModal(true)
                    }}
                >
                    <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                        <Text className="text-2xl font-JakartaExtraBold mb-2">Please verify</Text>
                        <Text className="font-JakartaSemiBold mb-5">Verification code sent to {form.email}. Please check your email.</Text>
                        <InputField
                            label="Code"
                            icon={icons.lock}
                            placeholder="12345"
                            value={verification.code}
                            keyboardType="numeric"
                            onChangeText={(code) => setVerification({ ...verification, code })}
                        />

                        {verification.error && (
                            <Text className="text-red-500 text-sm mt-1">
                                {verification.error};
                            </Text>
                        )}

                        <CustomButton title="Verify Email" onPress={onPressVerify} className="w-full mt-5 bg-success-500 " />

                    </View>
                </ReactNativeModal>

                <ReactNativeModal isVisible={showSuccessModal}>
                    <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                        <Image source={images.check} className="w-[110px] h-[110px] mx-auto my-5" />
                        <Text className="text-3xl font-JakartaBold text-center">
                            Verification Successful!
                        </Text>
                        <Text className="text-base text-center text-gray-400 font-JakartaSemiBold mt-2">Thank-you for successfully verifying your account.</Text>
                        <CustomButton title="Continue" onPress={() => {
                            setShowSuccessModal(false);
                            router.push("/(root)/(tabs)/home");
                        }} className="mt-10" />
                    </View>
                </ReactNativeModal>

            </View>
        </ScrollView>
    )
};

export default SignUp;