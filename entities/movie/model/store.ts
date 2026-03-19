import {Movie} from "@/entities/movie/model/types";
import {create} from "zustand";
import {MovieService} from "@/entities/movie/model/api";

interface MovieState {
    movie: Movie | null
    isLoading: boolean
    setMovie: (movie: Movie | null) => void
    fetchMovie: (id: number) => Promise<void>
}

export const useMovieStore = create<MovieState>((set) => ({
    movie: null,
    isLoading: false,
    setMovie: (movie) => set({movie}),
    fetchMovie: async (id: number) => {
        set({isLoading: true})
        try {
            const movie = await MovieService.getMovieDatilsById(id)
            set({movie, isLoading: false})
        } catch {
            set({movie: null, isLoading: false})
        }
    }
}))