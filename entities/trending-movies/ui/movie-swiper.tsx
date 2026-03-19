import { MovieTrending } from "@/entities/trending-movies/model/types";
import { ActivityIndicator, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import Carousel from 'react-native-reanimated-carousel';
import MovieItem from "@/entities/trending-movies/ui/movie-item";

interface Props {
    title: string;
    movies: MovieTrending[];
    loading: boolean;
}

export default function MovieSwiper({ title, movies, loading }: Props) {
    const { width } = useWindowDimensions();

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

            <Carousel
                loop
                width={width}
                height={400}
                autoPlay={true}
                data={movies}
                scrollAnimationDuration={3000}
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 50,
                }}
                renderItem={({ item }) => (
                    <MovieItem movie={item} />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        height: 400,
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
        fontSize: 24,
        fontFamily: 'Manrope-Bold',
        textAlign: 'left',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
});