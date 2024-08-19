import { icons } from "@/constants";
import { Tabs } from "expo-router"
import { Image, ImageSourcePropType, View } from "react-native";

const TabIcon = ({ source, focused }: { source: ImageSourcePropType; focused: boolean; }) => (
    <View className={`flex flex-row justify-center items-center rounded-full ${focused ? "bg-general-300" : ""}`}>
        <View className={`rounded-full w-12 h-12 items-center justify-center ${focused ? "bg-general-400" : ""}`}>
            <Image source={source} tintColor="white" resizeMode="contain" className="w-7 h-7" />
        </View>
    </View>
)

const Layout = () => (
    <Tabs initialRouteName="index" screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
            backgroundColor: "#333333",
            paddingBottom: 0,
            borderRadius: 10,
            overflow: "hidden",
            marginHorizontal: 20,
            marginBottom: 20,
            width: "auto",
            height: 70,
            display: "flex",
            justifyContent: "space-evenly",
            alignContent: "center",
            flexDirection: "row",
            position: "absolute",
        }
    }}>
        <Tabs.Screen
            name="home"
            options={{
                title: "Home",
                headerShown: false,
                tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.home} />
            }}
        />
        <Tabs.Screen
            name="deliveries"
            options={{
                title: "Gas Deliveries",
                headerShown: false,
                tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.list} />
            }}
        />
        <Tabs.Screen
            name="chat"
            options={{
                title: "Chat",
                headerShown: false,
                tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.chat} />
            }}
        />
        <Tabs.Screen
            name="profile"
            options={{
                title: "User Profile",
                headerShown: false,
                tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.profile} />
            }}
        />

    </Tabs>
);

export default Layout;