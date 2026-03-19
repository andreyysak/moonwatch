import { MovieTrending } from "@/entities/trending-movies/model/types";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {useRouter} from "expo-router";

interface Props {
    title: string;
    movies: MovieTrending[];
    loading: boolean;
}

export default function MovieList({ title, movies, loading }: Props) {
    const router = useRouter()

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#df0707" />
            </View>
        );
    }

    if (!movies || movies.length === 0) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <FlatList
                horizontal
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => router.push(`/movie/${item.id}`)}
                    >
                        <Image
                            source={{ uri: `https://image.tmdb.org/t/p/w342${item.poster_path}` }}
                            style={styles.image}
                        />
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{item.vote_average.toFixed(1)}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        height: 240,
        backgroundColor: '#111113',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#111113',
        marginVertical: 15,
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Manrope-Bold',
        textAlign: 'left',
        paddingHorizontal: 20,
        marginBottom: 12,
    },
    listContent: {
        paddingHorizontal: 20,
        gap: 16,
    },
    card: {
        width: 140,
        height: 210,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#1c1c1e',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    badge: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#df0707',
    },
    badgeText: {
        color: '#fff',
        fontFamily: 'Manrope-Bold',
        fontSize: 12,
    },
});