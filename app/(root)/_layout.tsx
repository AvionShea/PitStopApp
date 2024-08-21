import { Stack } from 'expo-router';

const Layout = () => {

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="find-delivery" />
            <Stack.Screen name="confirm-delivery" />
            {/* <Stack.Screen name="book-delivery" /> */}
        </Stack>
    );
};

export default Layout;