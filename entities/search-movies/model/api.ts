import {api} from "@/shared/api/api";

export const MovieSearchService = {
    async getMovieByTitle(query: string) {
        try {
            const response = await api(`/movies/search?query=${query}`)
            return response.data
        } catch (e) {
            console.error(e)
            throw e
        }
    }
}