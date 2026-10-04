import { create } from 'zustand';
import { LoginRequest } from "@/types/auth";
import { User } from "@/types/user";

interface AuthState {
    user: User | null
    loading: boolean
    login: (credentials: LoginRequest) => Promise<void>
    logout: () => Promise<void>
    setUser: (user: User | null) => void
}

export const useAuthStorage = create<AuthState>((set) => ({
    user: null,
    loading: false,
    login: async (credentials: LoginRequest) => {
        set({ loading: true })
        try {
            const response = await fetch('/Login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message || 'Credenciales incorrectas')
            }

            const usuario: User = await response.json()
            set({ user: usuario, loading: false })
        } catch (error) {
            set({ loading: false })
            throw error
        }
    },
    logout: async () => {
        await fetch('/api/auth/logout', { method: 'POST' })
        set({ user: null })
        window.location.href = '/login'
    },
    setUser: (user) => set({ user }),
}))
