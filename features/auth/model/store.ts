import {create} from "zustand";
import * as SecureStore from 'expo-secure-store'

interface AuthState {
    token: string | null
    isLoading: boolean

    setToken: (value: string | null) => void
    loadToken: () => Promise<void>
    logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    isLoading: true,

    setToken: async (token) => {
        if (token) {
            await SecureStore.setItemAsync('token', token)
        } else {
            await SecureStore.deleteItemAsync('token')
        }
        set({token, isLoading: false})
    },

    loadToken: async () => {
        try {
            const token = await SecureStore.getItemAsync('token')
            set({token, isLoading: false})
        } catch (e) {
            set({token: null, isLoading: false})
        }
    },

    logout: async () => {
        await SecureStore.deleteItemAsync('token')
        set({token: null, isLoading: false})
    }
}))
