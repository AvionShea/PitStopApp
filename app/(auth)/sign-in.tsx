import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useSignIn } from "@clerk/clerk-expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";


const SignIn = () => {
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const onSignInPress = useCallback(async () => {
        if (!isLoaded) {
            return
        }

        try {
            const signInAttempt = await signIn.create({
                identifier: form.email,
                password: form.password,
            });

            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId })
                router.replace('/')
            } else {
                // See https://clerk.com/docs/custom-flows/error-handling
                // for more info on error handling
                console.error(JSON.stringify(signInAttempt, null, 2))
            }
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2))
        }
    }, [isLoaded, form.email, form.password])

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