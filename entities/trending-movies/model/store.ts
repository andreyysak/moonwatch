import {MoviePopular, MovieTrending, MovieUpcoming} from "@/entities/trending-movies/model/types";
import {create} from "zustand";
import {TrendingMovieService} from "@/entities/trending-movies/model/api";

interface TrendingMovieState {
    trendingMovies: MovieTrending[] | []
    popularMovies: MoviePopular[] | []
    upcomingMovies: MovieUpcoming[] | []
    isLoading: boolean

    setTrendingMovies: (trendingMovies: MovieTrending[] | []) => void
    setPopularMovies: (popularMovies: MoviePopular[] | []) => void
    setUpcomingMovies: (upcomingMovies: MovieUpcoming[] | []) => void

    fetchTrendingMovies: () => Promise<void>
    fetchPopularMovies: () => Promise<void>
    fetchUpcomingMovies: () => Promise<void>
}

export const useTrendingMovies = create<TrendingMovieState>((set) => ({
    trendingMovies: [],
    popularMovies: [],
    upcomingMovies: [],
    isLoading: false,

    setTrendingMovies: (trendingMovies) => set({trendingMovies}),
    setPopularMovies: (popularMovies) => set({popularMovies}),
    setUpcomingMovies: (upcomingMovies) => set({upcomingMovies}),

    fetchTrendingMovies: async () => {
        set({isLoading: true})
        try {
            const trendingMovies = await TrendingMovieService.getTrendingMovies()
            set({trendingMovies, isLoading: false})
        } catch {
            set({trendingMovies: [], isLoading: false})
        }
    },

    fetchPopularMovies: async () => {
        set({isLoading: true})
        try {
            const popularMovies = await TrendingMovieService.getPopularMovies()
            set({popularMovies, isLoading: false})
        } catch {
            set({popularMovies: [], isLoading: false})
        }
    },

    fetchUpcomingMovies: async () => {
        set({isLoading: true})
        try {
            const upcomingMovies = await TrendingMovieService.getUpcomingMovies()
            set({upcomingMovies, isLoading: false})
        } catch {
            set({upcomingMovies: [], isLoading: false})
        }
    },
}))