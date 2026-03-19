import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {
    useFonts,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_700Bold
} from '@expo-google-fonts/manrope';
import { useAuthStore } from '@/features/auth/model/store';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const { token, isLoading, loadToken } = useAuthStore();
    const segments = useSegments();
    const router = useRouter();

    const [loaded, error] = useFonts({
        'Manrope-Regular': Manrope_400Regular,
        'Manrope-Medium': Manrope_500Medium,
        'Manrope-Bold': Manrope_700Bold,
    });

    useEffect(() => {
        loadToken();
    }, []);

    useEffect(() => {
        if (isLoading || !loaded) return;

        const inAuthGroup = segments[0] === '(auth)';

        if (!token && !inAuthGroup) {
            router.replace('/login');
        } else if (token && inAuthGroup) {
            router.replace('/');
        }
    }, [token, isLoading, segments, loaded]);

    useEffect(() => {
        if ((loaded || error) && !isLoading) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error, isLoading]);

    if (!loaded && !error) return null;

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)/login" options={{ title: 'Login' }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    );
}