import { User } from "@/entities/user/model/types";
import { create } from "zustand";
import { UserService } from "@/entities/user/model/api";

interface UserState {
    user: User | null
    isLoading: boolean
    fetchUser: () => Promise<void>
    setUser: (user: User | null) => void
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    isLoading: true,

    setUser: (user) => set({ user }),

    fetchUser: async () => {
        set({ isLoading: true })
        try {
            const user = await UserService.getUser()
            set({ user, isLoading: false })
        } catch (error) {
            set({ user: null, isLoading: false })
        }
    }
}))