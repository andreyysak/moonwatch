import { StyleSheet, Text, View } from "react-native";

interface Genre {
    id: number;
    name: string;
}

interface Props {
    genres: Genre[];
}

export default function MovieGenres({ genres }: Props) {
    return (
        <View style={styles.genresContainer}>
            {genres.map((genre) => (
                <View key={genre.id} style={styles.genreBadge}>
                    <Text style={styles.genreText}>{genre.name}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    genresContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 30,
    },
    genreBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#2c2c2e',
        backgroundColor: 'rgba(44, 44, 46, 0.3)',
    },
    genreText: {
        color: '#ddd',
        fontSize: 12,
        fontFamily: 'Manrope-Medium',
    },
});