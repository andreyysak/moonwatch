import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useSearchMovies } from "@/entities/search-movies/model/store";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function SearchScreen() {
    const {
        query,
        setQuery,
        movies,
        isLoading,
        fetchSearchMovies,
        itemsPerDefault,
        setItemsPerDefault
    } = useSearchMovies();
    const router = useRouter();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (query.trim().length > 0) {
                fetchSearchMovies(query);
            }
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [query, fetchSearchMovies]);

    const renderMovieItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.movieCard}
            // onPress={() => router.push(`/movie/${item.id}`)}
        >
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w185${item.poster_path}` }}
                style={styles.poster}
                resizeMode="cover"
            />
            <View style={styles.movieInfo}>
                <Text style={styles.movieTitle} numberOfLines={1}>{item.title}</Text>
                <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={styles.ratingText}>{item.vote_average?.toFixed(1)}</Text>
                    <Text style={styles.releaseDate}> • {item.release_date?.split('-')[0]}</Text>
                </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#333" />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Search movies</Text>

            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />

                <TextInput
                    style={styles.input}
                    placeholder='Search by title'
                    placeholderTextColor="#555"
                    selectionColor="#df0707"
                    value={query}
                    onChangeText={setQuery}
                />

                {query.length > 0 && (
                    <TouchableOpacity onPress={() => setQuery('')}>
                        <Ionicons name="close-circle" size={20} color="#888" />
                    </TouchableOpacity>
                )}
            </View>

            {isLoading ? (
                <View style={styles.centerLoader}>
                    <ActivityIndicator size="large" color="#df0707" />
                </View>
            ) : (
                <FlatList
                    data={movies.slice(0, itemsPerDefault)}
                    renderItem={renderMovieItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        query.length > 0 ? (
                            <Text style={styles.emptyText}>No movies found for {query}</Text>
                        ) : null
                    }
                    ListFooterComponent={
                        movies.length > itemsPerDefault ? (
                            <TouchableOpacity
                                style={styles.showMoreBtn}
                                onPress={() => setItemsPerDefault(itemsPerDefault + 3)}
                            >
                                <Text style={styles.showMoreText}>Show more</Text>
                            </TouchableOpacity>
                        ) : null
                    }
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#111113',
        flex: 1,
        paddingHorizontal: 20,
    },
    centerLoader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 32,
        fontFamily: 'Manrope-Bold',
        marginTop: 20,
        marginBottom: 24,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1c1c1e',
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 56,
        borderWidth: 1,
        borderColor: '#2c2c2e',
        marginBottom: 20,
    },
    searchIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Manrope-Medium',
        height: '100%',
    },
    listContent: {
        paddingBottom: 40,
    },
    movieCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1c1c1e',
        borderRadius: 12,
        padding: 10,
        marginBottom: 12,
    },
    poster: {
        width: 60,
        height: 90,
        borderRadius: 8,
        backgroundColor: '#2c2c2e',
    },
    movieInfo: {
        flex: 1,
        marginLeft: 16,
    },
    movieTitle: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Manrope-Bold',
        marginBottom: 6,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        color: '#FFD700',
        fontSize: 14,
        fontFamily: 'Manrope-Medium',
        marginLeft: 4,
    },
    releaseDate: {
        color: '#888',
        fontSize: 14,
        fontFamily: 'Manrope-Regular',
    },
    emptyText: {
        color: '#555',
        textAlign: 'center',
        marginTop: 40,
        fontSize: 16,
        fontFamily: 'Manrope-Regular',
    },
    showMoreBtn: {
        backgroundColor: '#1c1c1e',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#2c2c2e',
    },
    showMoreText: {
        color: '#df0707',
        fontSize: 16,
        fontFamily: 'Manrope-Bold',
    }
});