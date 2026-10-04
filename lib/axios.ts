import axios from 'axios'

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true, //Incluye cookies httpOnly en cada request
    headers:{
        'Content-Type': 'application/json'
    },
})

// Interceptor de respuesta: si el backend resónse 401, redirige al login

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response?.status === 401){
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export default apiClient;