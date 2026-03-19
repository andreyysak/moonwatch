import {api} from "@/shared/api/api";
import {MovieTrending} from "@/entities/trending-movies/model/types";

export const TrendingMovieService = {
    async getTrendingMovies(): Promise<MovieTrending[]> {
        try {
            const response = await api<MovieTrending[]>('/movies/trending')
            return response.data
        } catch (e) {
            console.error(e)
            throw e
        }
    },
    async getPopularMovies(): Promise<MovieTrending[]>{
        try {
            const response = await api<MovieTrending[]>('/movies/popular')
            return response.data
        } catch (e) {
            console.error(e)
            throw e
        }
    },
    async getUpcomingMovies(): Promise<MovieTrending[]> {
        try {
            const response = await api<MovieTrending[]>('/movies/upcoming')
            return response.data
        } catch (e) {
            console.error(e)
            throw e
        }
    },
}