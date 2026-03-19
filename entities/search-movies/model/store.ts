import {MovieSearch} from "@/entities/search-movies/model/types";
import {create} from "zustand";
import {MovieSearchService} from "@/entities/search-movies/model/api";

interface SearchMoviesState {
    movies: MovieSearch[] | []
    isLoading: boolean
    query: string
    itemsPerDefault: number,
    setItemsPerDefault: (itemsPerDefault: number) => void
    setQuery: (query: string) => void
    setMovies: (movies: MovieSearch[] | []) => void
    fetchSearchMovies: (query: string) => Promise<void>
}

export const useSearchMovies = create<SearchMoviesState>((set) => ({
    movies: [],
    isLoading: false,
    query: '',
    itemsPerDefault: 4,

    setItemsPerDefault: (val) => set({ itemsPerDefault: val }),
    setQuery: (query) => set({ query, itemsPerDefault: 4 }),
    setMovies: (movies) => set({ movies }),

    fetchSearchMovies: async (query: string) => {
        if (!query) return;
        set({ isLoading: true });
        try {
            const movies = await MovieSearchService.getMovieByTitle(query);
            set({ movies: movies || [], isLoading: false });
        } catch {
            set({ movies: [], isLoading: false });
        }
    }
}));