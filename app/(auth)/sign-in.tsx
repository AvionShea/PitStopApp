import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";


const SignIn = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const onSignInPress = async () => { };

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
                        Welcome Back!
                    </Text>
                </View>

                <View className="p-3">
                    <InputField
                        label="Email"
                        placeholder="Enter your email"
                        icon={icons.email}
                        value={form.email}
                        onChangeText={(value) => setForm({ ...form, email: value })}
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
                        marginTop: -46,
                        marginBottom: 70,
                        marginLeft: 335,
                    }}>
                        <MaterialCommunityIcons
                            name={showPassword ? 'eye-off' : 'eye'}
                            size={25}
                            color="#aaa"
                            onPress={toggleShowPassword}
                        />
                    </TouchableOpacity>

                    <CustomButton title="Sign In" onPress={onSignInPress} className="w-full mt-15" />

                    <OAuth />

                    <Link href="/(auth)/sign-up"
                        className="text-lg text-center text-general-200 mt-5"
                    >
                        <Text>Need an account?{" "}</Text>
                        <Text className="text-primary-500">Sign Up</Text>
                    </Link>
                </View>

                {/*VERIFICATION MODAL */}

            </View>
        </ScrollView>
    )
};

export default SignIn;