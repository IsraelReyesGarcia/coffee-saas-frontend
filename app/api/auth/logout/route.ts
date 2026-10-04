import { NextResponse } from "next/server";

export async function POST(){
    const response = NextResponse.json({message: 'Sesión cerrada correctamente'})

    response.cookies.set('coffeesos_token','',{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0,
        path:'/'
    })

    return response;
}