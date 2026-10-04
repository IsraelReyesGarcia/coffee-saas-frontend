import { create} from 'zustand';
import { LoginRequest } from "@/types/auth";
import { User } from "@/types/user";

interface AuthState{
    user: User | null
    loading: boolean
    login: (credentials: LoginRequest) => Promise<void>
    logout: () => Promise<void>
    setUser: (user: User | null) => void
}

export const useAuthStore =  create<AuthState>((set) => ({
    user: null,
    loading: false,
    login: async (credentials: LoginRequest) => {
        set({loading: true})
        try {
            // Llama al Route Handler de Next.js (no directamente al backend)
            // El Route Handler guarda el JWT en httpOnly cookie
            const response = await fetch('/api/auth/login',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(credentials),
            })

            if(!response.ok){
                const error = await response.json()
                throw new Error(error.message || 'Credenciales incorrectas')
            }

            const user = await response.json();
            set({user, loading: false})
        } catch (error) {
            set({loading: false})
            throw error
        }
    },
    logout: async () => {
        await fetch('/api/auth/logout', {method:'POST'})
        set({user: null})
        window.location.href ='/login'
    },
    setUser: (user) => set({user}),
}))
