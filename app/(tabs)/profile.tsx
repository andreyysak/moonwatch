import {StyleSheet, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

export default function ProfileScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Profile</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#111113',
        flex: 1,
        alignItems: 'center',
        padding: 24,
    },
    text: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '500',
    }
})