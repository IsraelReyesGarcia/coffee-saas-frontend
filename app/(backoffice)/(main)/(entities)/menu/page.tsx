import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DivideSquareIcon, Minus, Plus } from "lucide-react"
import CardFood from "./components/CardFood";


export default function page () {
    return <>
        
        
        <div className="w-full flex gap-2 flex-row p-4 bg-gray-50 items-start relative">
            <div className="w-[80%] flex flex-col">
                <div>
                    <h4 className="text-gray-400 text-sm">MESA 7 - BIENVENIDO</h4>
                    <h1 className="font-semibold font-winky mt-5 text-3xl">
                        Selecciona las ordenes de los clientes
                    </h1>
                </div>
                {/* Contenedor de la lista de menús */}
                <div className="w-full flex flex-row flex-wrap gap-4 p-3 mt-5 bg-gray-50">
                    {'1234567890'.split('').map((item) => (
                        <CardFood key={item} />
                    ))}

                </div>
            </div>
            
            {/* Contenedor del carrito y del total a pagar */}
            <Card className="w-[20%] right-1 h-[100vh] min-w-[250px] flex flex-coltop-4 fixed">
                <CardHeader>
                    <CardTitle>Tu orden</CardTitle>
                    <h3>3 artículos</h3>
                </CardHeader>
                {/* Lista de items — hace scroll si hay muchos */}
                <div className="flex-1 overflow-y-auto">
                    <div className="flex flex-row justify-between p-4">
                        <div>
                            <p className="font-semibold">Latte</p>
                            <p className="text-gray-400">$52 c/u</p>
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center gap-2">
                                <button className="font-semibold px-3 py-2 hover:cursor-pointer">
                                    <Minus size={16}/>
                                </button>
                                <p>1</p>
                                <button className="font-semibold px-3 py-2 hover:cursor-pointer">
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Totales — siempre al pie */}
                <div className="bg-gray-50 p-4 border-t">
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-col">
                                <p className="text-gray-400">Subtotal</p>
                                <p className="text-gray-400">IVA(16%)</p>
                            </div>
                            <div className="flex flex-col justify-end">
                                <p className="text-right">$242</p>
                                <p className="text-right">$39</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between mt-5">
                            <p className="font-semibold">Total</p>
                            <p className="font-bold text-xl">$281</p>
                        </div>
                        <div className="flex flex-row justify-between gap-2">
                            <Button size={'xl'}> Pagar tarjeta</Button>
                            <Button variant={'secondary'} size={'xl'}>Efectivo</Button>
                        </div>
                        <div className="flex justify-center items-center mt-3">
                            <button className="text-sm text-red-400 hover:cursor-pointer hover:text-red-500">Cancelar orden con justificación</button>
                        </div>
                </div>
            </Card>
        </div>

        
        
    </>
}