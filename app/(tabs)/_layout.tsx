import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function TopHeader() {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.headerWrapper, { paddingTop: insets.top + 10 }]}>
            <TouchableOpacity onPress={() => console.log('Go to history')}>
                <Ionicons name="time-outline" size={28} color="#fff" />
            </TouchableOpacity>

            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>M</Text>
                </View>
            </View>

            <TouchableOpacity onPress={() => console.log('Go to favorites')}>
                <Ionicons name="heart-outline" size={28} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#df0707',
                tabBarStyle: {
                    backgroundColor: '#111113',
                    paddingTop: 10,
                    borderTopWidth: 0,
                },
                headerShown: true,
                header: () => <TopHeader />,
            }}
        >
            <Tabs.Screen name='index' options={{
                title: 'Home', tabBarIcon: ({color, focused}) => (
                    <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24}/>
                )
            }}/>
            <Tabs.Screen name='search-movies' options={{
                title: 'Search',
                tabBarIcon: ({color, focused}) => (
                    <Ionicons name={focused ? 'search-sharp' : 'search-outline'} color={color} size={24} />
                )
            }}/>
            <Tabs.Screen name='profile' options={{
                title: 'Profile',
                tabBarIcon: ({color, focused}) => (
                    <Ionicons name={focused ? 'person-sharp' : 'person-outline'} color={color} size={24} />
                )
            }}/>
        </Tabs>
    )
}

const styles = StyleSheet.create({
    headerWrapper: {
        backgroundColor: '#111113',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
    },
    header: {
        alignItems: 'center',
    },
    logoContainer: {
        backgroundColor: '#df0707',
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#df0707',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    logoText: {
        color: '#fff',
        fontSize: 24,
        fontFamily: 'Manrope-Bold',
        includeFontPadding: false,
    }
});