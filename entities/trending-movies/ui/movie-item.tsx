import { MovieTrending } from "@/entities/trending-movies/model/types";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
    movie: MovieTrending;
}

export default function MovieItem({ movie }: Props) {
    return (
        <TouchableOpacity
            style={styles.card}
        >
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                style={styles.image}
            />
            <View style={styles.badge}>
                <Text style={styles.badgeText}>{movie.vote_average.toFixed(1)}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.movieTitle} numberOfLines={1}>{movie.title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: '#1c1c1e',
        marginHorizontal: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    badge: {
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#df0707',
    },
    badgeText: {
        color: '#fff',
        fontFamily: 'Manrope-Bold',
        fontSize: 14,
    },
    info: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: 'rgba(17, 17, 19, 0.6)',
    },
    movieTitle: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Manrope-Bold',
    }
});