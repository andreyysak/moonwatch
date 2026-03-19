import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
    voteAverage: number;
    releaseDate: string;
    runtime: number;
}

export default function MovieStats({ voteAverage, releaseDate, runtime }: Props) {
    const formatRuntime = (minutes: number) => {
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return `${h}h ${m}m`;
    };

    const getYear = (dateString: string) => {
        if (!dateString) return '';
        return dateString.split('-')[0];
    };

    return (
        <View style={styles.statsRow}>
            <View style={styles.ratingBadge}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>{voteAverage.toFixed(1)}</Text>
            </View>
            <Text style={styles.statDot}>•</Text>
            <Text style={styles.statText}>{getYear(releaseDate)}</Text>
            <Text style={styles.statDot}>•</Text>
            <Text style={styles.statText}>{formatRuntime(runtime)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        gap: 4,
    },
    ratingText: {
        color: '#FFD700',
        fontSize: 14,
        fontFamily: 'Manrope-Bold',
    },
    statDot: {
        color: '#555',
        marginHorizontal: 12,
        fontSize: 18,
    },
    statText: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Manrope-Medium',
    },
});