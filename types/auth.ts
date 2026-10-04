export interface LoginRequest{
    userName: string
    password: string
}

export interface LoginResponse{
    //token: string
    userName: string
    message?: string
    /* password: string
    rol: string */
}
