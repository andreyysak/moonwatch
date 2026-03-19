import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

interface CastMember {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}

interface Props {
    cast: CastMember[];
}

export default function MovieCast({ cast }: Props) {
    return (
        <View style={styles.castSection}>
            <Text style={styles.sectionTitle}>Cast</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.castContainer}>
                {cast.slice(0, 15).map((actor) => (
                    <View key={actor.id} style={styles.castItem}>
                        <Image
                            source={{ uri: actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : 'https://via.placeholder.com/185x278/2c2c2e/888888?text=No+Photo' }}
                            style={styles.castImage}
                        />
                        <Text style={styles.castName} numberOfLines={1}>{actor.name}</Text>
                        <Text style={styles.castCharacter} numberOfLines={1}>{actor.character}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    castSection: {
        marginTop: 10,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Manrope-Bold',
        marginBottom: 12,
    },
    castContainer: {
        gap: 16,
        paddingRight: 24,
    },
    castItem: {
        width: 100,
    },
    castImage: {
        width: 100,
        height: 130,
        borderRadius: 16,
        marginBottom: 8,
        backgroundColor: '#2c2c2e',
    },
    castName: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Manrope-Bold',
        marginBottom: 2,
    },
    castCharacter: {
        color: '#888',
        fontSize: 12,
        fontFamily: 'Manrope-Regular',
    },
});