import { StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MovieSwiper from "@/entities/trending-movies/ui/movie-swiper";
import MovieList from "@/entities/trending-movies/ui/movie-list";
import { useTrendingMovies } from "@/entities/trending-movies/model/store";
import { useEffect } from "react";

export default function HomeScreen() {
    const {
        isLoading,
        trendingMovies,
        popularMovies,
        upcomingMovies,
        fetchTrendingMovies,
        fetchUpcomingMovies,
        fetchPopularMovies
    } = useTrendingMovies();

    useEffect(() => {
        fetchTrendingMovies();
        fetchUpcomingMovies();
        fetchPopularMovies();
    }, [fetchTrendingMovies, fetchPopularMovies, fetchUpcomingMovies]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoText}>M</Text>
                    </View>
                </View>

                <MovieSwiper title="Trending Movies" movies={trendingMovies} loading={isLoading} />
                <MovieList title="Popular Movies" movies={popularMovies} loading={isLoading} />
                <MovieList title="Upcoming Movies" movies={upcomingMovies} loading={isLoading} />

                <View style={styles.bottomSpacer} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#111113',
    },
    scrollContent: {
        flexGrow: 1,
        paddingTop: 10,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logoContainer: {
        backgroundColor: '#df0707',
        width: 60,
        height: 60,
        borderRadius: 16,
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
        fontSize: 36,
        fontFamily: 'Manrope-Bold',
        includeFontPadding: false,
    },
    bottomSpacer: {
        height: 40,
    }
});