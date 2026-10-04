"use client"
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth} from '@/hooks/useAuth';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/input-password";
import { Label } from "@/components/ui/label";


export default function FormLogin(){
    const [form, setForm] = useState({user:'', password:''});
    const { login } = useAuth();
    const router = useRouter();
    const searchparams = useSearchParams();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit =async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        /* Llamar al login */
        try {
            await login({userName: form.user, password: form.password})
            router.push(searchparams.get('redirect') ?? '/menu');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al iniciar sesión' )
        }
        router.push('/menu')

    }
    return (
        <>
            <form
                className="space-y-8 w-full py-10 max-w-[400px] bg-blue-100 p-4 rounded-md shadow-md"
                onSubmit={handleSubmit}
            >
                <div
                    className="flex flex-col gap-2"
                >
                    <Label>Usuario</Label>
                    <Input
                        placeholder="Usuario"
                        onChange={(e)=>setForm({...form, user:e.target.value})}
                        value={form.user}
                    />
                </div>

                <div
                    className="flex flex-col gap-2"
                >
                    <Label>Contraseña</Label>
                    <InputPassword
                        placeholder="Contraseña"
                        onChange={(e) => setForm({...form, password:e.target.value})}
                        value={form.password}
                    />
                </div>

                <div className="flex justify-center items-center">
                    <Button type={"submit"} variant={'outline'} size={'lg'} className="hover:cursor-pointer">
                        Iniciar sesión
                    </Button>
                </div>
            </form>

            {error && <p className="text-red-600 text-sm">{error}</p>}
        </>
    )
}
