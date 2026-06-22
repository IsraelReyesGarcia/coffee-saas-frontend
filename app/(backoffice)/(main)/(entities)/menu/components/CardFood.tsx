import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function CardFood(){
    return(
        <div className=" w-[200px] sm:w-[180px] md:w-[200px] h-[250px] sm:h-[250px] md:h-[300px] bg-white rounded-md overflow-hidden">
            <div className="w-full h-[45%] overflow-hidden">
                <Image
                    src={"/imgs/coffee.png"}
                    width={300}
                    height={300}
                    alt="Café"
                />
            </div>
            <CardContent className=" p-3">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="font-semibold text-lg">Café</h1>
                    <h1 className="font-semibold text-gray-400 text-xl">$62</h1>
                </div>
                <p className="text-gray-500 text-sm">Expresso doble con leche texturizada y arte latte.</p>
            </CardContent>
            <div className="w-full flex justify-center items-center mt-2 p-3">
                <Button size={'xl'} className="w-full" variant={'secondary'}> 
                    Agregar +
                </Button>
            </div>
        </div>
    )
}