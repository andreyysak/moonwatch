import { useMovieStore } from "@/entities/movie/model/store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MovieHeaderImage from "@/entities/movie/ui/movie-header-image";
import MovieStats from "@/entities/movie/ui/movie-stats";
import MovieGenres from "@/entities/movie/ui/movie-genres";
import MovieCast from "@/entities/movie/ui/movie-cast";

export default function MovieDetailScreen() {
    const { movie, isLoading, fetchMovie } = useMovieStore();
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

    useEffect(() => {
        if (id) {
            fetchMovie(Number(id));
        }
    }, [fetchMovie, id]);

    if (isLoading) {
        return (
            <SafeAreaView style={styles.loaderContainer}>
                <ActivityIndicator size='large' color='#df0707' />
            </SafeAreaView>
        );
    }

    if (!movie) {
        return (
            <SafeAreaView style={styles.loaderContainer}>
                <Text style={styles.errorText}>Movie not found</Text>
            </SafeAreaView>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                <MovieHeaderImage backdropPath={movie.backdrop_path} posterPath={movie.poster_path} />

                <SafeAreaView style={styles.backButtonContainer} edges={['top']}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={28} color="#fff" />
                    </TouchableOpacity>
                </SafeAreaView>

                <View style={styles.contentContainer}>
                    <Text style={styles.title}>{movie.title}</Text>

                    {movie.tagline ? (
                        <Text style={styles.tagline}>{movie.tagline}</Text>
                    ) : null}

                    <MovieStats
                        voteAverage={movie.vote_average}
                        releaseDate={movie.release_date}
                        runtime={movie.runtime}
                    />

                    <MovieGenres genres={movie.genres} />

                    <Text style={styles.sectionTitle}>Storyline</Text>
                    <Text style={styles.overview}>{movie.overview}</Text>

                    {movie.credits?.cast && movie.credits.cast.length > 0 && (
                        <MovieCast cast={movie.credits.cast} />
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111113',
    },
    loaderContainer: {
        flex: 1,
        backgroundColor: '#111113',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: '#888',
        fontSize: 18,
        fontFamily: 'Manrope-Medium',
    },
    backButtonContainer: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 10,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(17, 17, 19, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    contentContainer: {
        paddingHorizontal: 24,
        marginTop: -60,
        paddingBottom: 40,
    },
    title: {
        color: '#fff',
        fontSize: 32,
        fontFamily: 'Manrope-Bold',
        marginBottom: 8,
    },
    tagline: {
        color: '#888',
        fontSize: 16,
        fontFamily: 'Manrope-Medium',
        fontStyle: 'italic',
        marginBottom: 16,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Manrope-Bold',
        marginBottom: 12,
    },
    overview: {
        color: '#aaa',
        fontSize: 15,
        fontFamily: 'Manrope-Regular',
        lineHeight: 24,
        marginBottom: 30,
    },
});