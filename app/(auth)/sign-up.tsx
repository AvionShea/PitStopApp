import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useSignUp } from "@clerk/clerk-expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import ReactNativeModal from "react-native-modal";


const SignUp = () => {
    const { isLoaded, signUp, setActive } = useSignUp();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
    });

    const [verification, setVerification] = useState({
        state: "success",
        error: "",
        code: "",
    });

    const onSignUpPress = async () => {
        if (!isLoaded) {
            return
        };

        try {
            await signUp.create({
                emailAddress: form.email,
                password: form.password,
            });

            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

            setVerification({
                ...verification,

                state: "pending",
            });
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2))
        };
    };

    const onPressVerify = async () => {
        if (!isLoaded) return;

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code: verification.code,
            });

            if (completeSignUp.status === 'complete') {

                //TODO: Create a database user

                await setActive({ session: completeSignUp.createdSessionId });
                setVerification({ ...verification, state: "success" });
            } else {
                setVerification({ ...verification, error: "Verification failed.", state: "failed" });
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
                        onChangeText={(value) => setForm({ ...form, email: value })}
                    />
                    <InputField
                        label="Phone Number"
                        placeholder="Enter your phone number"
                        icon={icons.phone}
                        value={form.phoneNumber}
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
                    <TouchableOpacity style={{
                        marginTop: -45,
                        marginBottom: 50,
                        marginLeft: 335,
                    }}>
                        <MaterialCommunityIcons
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

                <ReactNativeModal isVisible={verification.state === "success"}>
                    <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                        <Image source={images.check} className="w-[110px] h-[110px] mx-auto my-5" />
                    </View>
                </ReactNativeModal>

            </View>
        </ScrollView>
    )
};

export default SignUp;