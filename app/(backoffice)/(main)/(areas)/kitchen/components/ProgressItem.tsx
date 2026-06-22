import { Button } from "@/components/ui/button";
import { ArrowRightFromLine } from "lucide-react";
import { ProgressColor } from "@/types/colors";

export default function ProgressItem({ color }: { color: ProgressColor }) {
    return (
        <div
            className="w-full mt-2 flex flex-col rounded-md border border-gray-300 p-2 gap-1"
            style={{ backgroundColor: `${color}33` }}
        >
            <div className="flex flex-row justify-between">
                <h1 className="font-semibold text-lg">Mesa 4</h1>
                <p className="font-semibold text-gray-400 text-sm">2 min</p>
            </div>

            <div>
                <div className="flex flex-row">
                    <p className="text-red-200">2x</p>
                    <p className="pl-2 text-gray-400">Latte</p>
                </div>
                <div className="flex flex-row">
                    <p className="text-red-200">1x</p>
                    <p className="pl-2 text-gray-400">Croissant</p>
                </div>
                <Button className="w-full mt-3 hover:cursor-pointer" size={'lg'} style={{ backgroundColor: color }}>
                    Empezar <ArrowRightFromLine />
                </Button>
            </div>
        </div>
    )
}