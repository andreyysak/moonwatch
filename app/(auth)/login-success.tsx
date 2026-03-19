import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuthStore } from "@/features/auth/model/store";

export default function LoginSuccess() {
    const { token } = useLocalSearchParams<{ token: string }>();
    const setToken = useAuthStore((state) => state.setToken);
    const router = useRouter();

    useEffect(() => {
        const handleToken = async () => {
            if (token) {
                await setToken(token);
                router.replace('/');
            } else {
                router.replace('/login');
            }
        };

        handleToken();
    }, [token]);

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#df0707" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111113',
        justifyContent: 'center',
        alignItems: 'center',
    }
});