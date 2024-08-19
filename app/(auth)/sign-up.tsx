import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";


const SignUp = () => {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
    });

    const onSignUpPress = async () => { };

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

                {/*VERIFICATION MODAL */}

            </View>
        </ScrollView>
    )
};

export default SignUp;