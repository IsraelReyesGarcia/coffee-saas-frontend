"use client"
import FormLogin from "../components/FormLogin";

export default function LoginPage(){
    return (
        <>
            <div className="w-full h-screen flex flex-col gap-4 justify-center items-center bg-gray-50">
                <FormLogin />
            </div>
        </>
    )
}
