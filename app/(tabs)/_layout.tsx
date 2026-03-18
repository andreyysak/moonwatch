import {Tabs} from "expo-router";
import {Ionicons} from "@expo/vector-icons";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#df0707',
                tabBarStyle: {
                    backgroundColor: '#111113',
                    paddingTop: 10,
                },
                headerShown: false,
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