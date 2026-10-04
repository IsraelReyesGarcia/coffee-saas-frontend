import { NextRequest, NextResponse} from 'next/server'
import axios from 'axios'

export async function POST(request: NextRequest){
    try {
        const body = await request.json();

        // llamar el endpoint de login del backend .NET
        const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/Login`,
            body
        )

        const response = NextResponse.json({
            userName: data.userName,
            password: data.password,
            rol: data.rol,
        })

        console.log("La respuesta es: ", response);
        const payload = JSON.parse(
            Buffer.from(data.token.split('.')[1],'base64url').toString()
        );
        console.log("------------");
        console.log(payload);

        response.cookies.set('coffeesos_token', data.token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 8, // 8 horas
            path:'/'
        })

        return response;
    } catch (error) {
        if(axios.isAxiosError(error)){
            return NextResponse.json(
                {message: error.response?.data?.message || 'Credenciales incorrectas'},
                {status: error.response?.status || 400}
            )
        }

        return NextResponse.json(
            {message: 'Error al conectar con el servidor'},
            {status: 500}
        )
    }
}