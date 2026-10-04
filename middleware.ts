import { NextRequest, NextResponse } from "next/server";

// Rutas que no requieren autenticación
const rutasPublicas = ['/login']

export function middleware(request: NextRequest){
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('coffeesos_token')?.value

    const esRutaPublica = rutasPublicas.some((ruta) => 
        pathname.startsWith(ruta)
    )

    // Si no hay token y la ruta es privada -> redirigir al login
    if(!token && !esRutaPublica){
        //return NextResponse.redirect(new URL('/menu'))
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('redirect', pathname) // Guardar ruta de origen
        return NextResponse.redirect(loginUrl)
    }

    // Si hay token y el usuario intenta acceder al login -> redirigir al menu
    if(token && esRutaPublica){
        return NextResponse.redirect(new URL('/menu', request.url))
    }

    return NextResponse.next()
}

export const config = {
    // Aplicar middleware a todas las rutas excepto archivo estáticos y API
    matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
}