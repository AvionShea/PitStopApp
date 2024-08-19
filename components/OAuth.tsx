import { Image, Text, View } from "react-native";
import CustomButton from "./CustomButton";
import { icons } from "@/constants";


const OAuth = () => {
    const handleGoogleSignIn = async () => {

    };

    return (
        <View>
            <View className="flex flex-row justify-center items-center mt-1 gap-x-3">
                <View className="flex-1 h-[1px] bg-general-400" />
                <Text className="text-lg ">Or</Text>
                <View className="flex-1 h-[1px] bg-general-400" />
            </View>

            <CustomButton className="w-full mt-5 shadow-none"
                title="Sign in with Google"
                IconLeft={() => (
                    <Image source={icons.google} resizeMode="contain" className="w-5 h-5 mx-2" />
                )}
                bgVariant="outline"
                textVariant="primary"
                onPress={handleGoogleSignIn}
            />

        </View>
    );
};

export default OAuth;