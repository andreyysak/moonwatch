import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Image, StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { useUserStore } from "@/entities/user/model/store";
import { useAuthStore } from "@/features/auth/model/store";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
    const { user, isLoading, fetchUser } = useUserStore()
    const { logout } = useAuthStore()

    useEffect(() => {
        fetchUser()
    }, [fetchUser])

    const formatDate = (dateString?: string) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString('uk-UA', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }

    if (isLoading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#df0707" />
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <View style={styles.imageWrapper}>
                        <Image
                            source={{ uri: user?.image }}
                            alt="Profile"
                            style={styles.profileImage}
                        />
                    </View>
                    <Text style={styles.userName}>{user?.googleName || "User"}</Text>
                    <Text style={styles.userEmail}>{user?.email}</Text>
                </View>

                <View style={styles.infoSection}>
                    <View style={styles.infoCard}>
                        <View style={styles.infoRow}>
                            <View style={styles.iconContainer}>
                                <Ionicons name="shield-checkmark-outline" size={20} color="#df0707" />
                            </View>
                            <View>
                                <Text style={styles.infoLabel}>Role</Text>
                                <Text style={styles.infoValue}>{user?.role?.toUpperCase()}</Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.infoRow}>
                            <View style={styles.iconContainer}>
                                <Ionicons name="calendar-outline" size={20} color="#df0707" />
                            </View>
                            <View>
                                <Text style={styles.infoLabel}>In system from</Text>
                                <Text style={styles.infoValue}>{formatDate(user?.created_at)}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                    <Ionicons name="log-out-outline" size={20} color="#fff" />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#111113',
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: '#111113',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    imageWrapper: {
        padding: 4,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#df0707',
        marginBottom: 16,
    },
    profileImage: {
        height: 120,
        width: 120,
        borderRadius: 60,
        backgroundColor: '#1c1c1e',
    },
    userName: {
        fontSize: 24,
        fontFamily: 'Manrope-Bold',
        color: '#fff',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        fontFamily: 'Manrope-Regular',
        color: '#888',
    },
    infoSection: {
        width: '100%',
        marginBottom: 32,
    },
    infoCard: {
        backgroundColor: '#1c1c1e',
        borderRadius: 20,
        padding: 20,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(223, 7, 7, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoLabel: {
        fontSize: 12,
        fontFamily: 'Manrope-Regular',
        color: '#888',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    infoValue: {
        fontSize: 16,
        fontFamily: 'Manrope-Medium',
        color: '#fff',
        marginTop: 2,
    },
    divider: {
        height: 1,
        backgroundColor: '#2c2c2e',
        marginVertical: 16,
    },
    logoutButton: {
        backgroundColor: '#df0707',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 16,
        gap: 10,
        shadowColor: '#df0707',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Manrope-Bold',
    }
})