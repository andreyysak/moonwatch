import { api } from "@/shared/api/api";

export const UserService = {
    async getUser() {
        try {
            const response = await api.get('/user/me')
            return response.data
        } catch (e) {
            console.error(e)
            throw e
        }
    }
}