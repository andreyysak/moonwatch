import {SplashScreen, Stack} from 'expo-router';
import {useFonts, Manrope_400Regular, Manrope_500Medium, Manrope_700Bold} from "@expo-google-fonts/manrope";
import {useEffect} from "react";

export default function RootLayout() {
    const [loaded, error] = useFonts({
        'Manrope-Regular': Manrope_400Regular,
        'Manrope-Medium': Manrope_500Medium,
        'Manrope-Bold': Manrope_700Bold,
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync()
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null
    }

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    );
}