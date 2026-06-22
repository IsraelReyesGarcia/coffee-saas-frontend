import { Button } from "@/components/ui/button";
import { ArrowRightFromLine, Circle } from "lucide-react";
import ProgressItem from "./components/ProgressItem";
import { ProgressColor } from "@/types/colors";

export default function page() {
  return (
    <div className="w-full h-[100vh] flex gap-2 flex-col p-4 bg-gray-50 items-start relative">
        <div className="w-full flex justify-between">
            <div>
                <h4 className="text-gray-400 text-sm">PANTALLA DE COCINA - KIDS</h4>
                <h1 className="font-semibold font-winky mt-5 text-3xl">
                    Comandas
                </h1>
            </div>
            <div className="flex flex-row gap-5">
                <div className="flex flex-col rounded-lg border border-gray-200 shadow-sm bg-white px-3 py-2">
                    <h1 className="font-bold text-xl text-center">1</h1>
                    <p className="text-gray-400 text-sm text-center">Activas</p>
                </div>
                <div className="flex flex-col rounded-lg border border-gray-200 shadow-sm bg-white px-3 py-2">
                    <h1 className="font-bold text-2xl text-center">4</h1>
                    <p className="text-gray-400 text-sm text-center">Listas</p>
                </div>
            </div>
            
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="w-full">
                {/* Encabezado de apartado pendiente */}
                <div className="flex flex-row">
                    <Circle width={16}/>
                    <div className="flex flex-row">
                        <h1 className="font-semibold px-1">Pendiente </h1>
                        <p className="text-gray-400 font-semibold pl-3"> 2</p>
                    </div>
                </div>

                <ProgressItem color={ProgressColor.PENDIENTE} />
                <ProgressItem color={ProgressColor.PENDIENTE} />
                <ProgressItem color={ProgressColor.PENDIENTE} />
            </div>

            <div className="w-full">
                {/* Encabezado de apartado pendiente */}
                <div className="flex flex-row">
                    <Circle width={16}/>
                    <div className="flex flex-row">
                        <h1 className="font-semibold px-1">En preparación</h1>
                        <p className="text-gray-400 font-semibold pl-3"> 2</p>
                    </div>
                </div>
                <ProgressItem color={ProgressColor.PREPARANDO} />
            </div>

            <div className="w-full">
                {/* Encabezado de apartado pendiente */}
                <div className="flex flex-row">
                    <Circle width={16}/>
                    <div className="flex flex-row">
                        <h1 className="font-semibold px-1">Listo </h1>
                        <p className="text-gray-400 font-semibold pl-3"> 2</p>
                    </div>
                </div>

                <ProgressItem color={ProgressColor.LISTO} />
                
            </div>

            
            

        </div>
    </div>
  )
}
