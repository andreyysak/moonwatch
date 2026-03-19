import { SafeAreaView } from "react-native-safe-area-context";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Linking from 'expo-linking';
import {redirectWithGoogleAuth} from "@/features/auth/model/api";

export default function Login() {
    const handleLogin = async () => {
        const authUrl = redirectWithGoogleAuth();
        await Linking.openURL(authUrl);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>M</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.googleButton} onPress={handleLogin}>
                <Image
                    style={styles.icon}
                    source={require('../../assets/images/google.png')}
                />
                <Text style={styles.buttonText}>Sign in with Google</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#111113',
        flex: 1,
        justifyContent: 'space-between',
        padding: 24,
        paddingBottom: 60,
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        backgroundColor: '#df0707',
        width: 100,
        height: 100,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#df0707',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 10,
    },
    logoText: {
        color: '#fff',
        fontSize: 60,
        fontFamily: 'Manrope-Bold',
        includeFontPadding: false,
        lineHeight: 65,
    },
    googleButton: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 16,
        gap: 12,
    },
    buttonText: {
        color: '#000',
        fontSize: 18,
        fontFamily: 'Manrope-Bold',
    },
    icon: {
        width: 24,
        height: 24,
    }
});