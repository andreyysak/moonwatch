import {Movie} from "@/entities/movie/model/types";
import {api} from "@/shared/api/api";

export const MovieService = {
    async getMovieDatilsById(id: number): Promise<Movie> {
        try {
            const response = await api(`/movies/tmdb-details/${id}`)
            return response.data
        } catch (e) {
            console.error(e)
            throw e
        }
    }
}
