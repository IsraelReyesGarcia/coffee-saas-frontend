import { Circle } from "lucide-react"

export default function Page(){
    return <>
        <div className="w-full h-[100vh] flex gap-2 flex-row p-4 bg-gray-50 items-start relative">
            <div className="w-full flex flex-col">
                <div>
                    <h4 className="text-gray-400 text-sm">TURNO DE LA MAÑANA</h4>
                    <h1 className="font-semibold font-winky mt-5 text-3xl">
                        Mesas
                    </h1>
                </div>
                {/* Contenedor de la lista de mesas */}
                <div className="w-full flex flex-row flex-wrap gap-4 p-3 mt-5 bg-gray-50">
                    {'1234567890'.split('').map((item) => (
                       <div key={item} className="flex min-w-[100px] flex-col gap-3 p-3 rounded-md border border-gray-300 shadow-sm">
                            <div className="flex flex-row justify-between items-center">
                                <h1 className="font-semibold text-2xl">M{item}</h1>
                                <Circle size={12} className="fill-green-200 text-green-200" />
                            </div>
                            <p>Dsiponible</p>

                       </div>
                    ))}

                </div>
            </div>
        </div>
    </>
}