"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ModalCategorie from "./components/ModalCategorie";
import { useState } from "react";
import ModalProduct from "./components/ModalProduct";
import { ProductOperation, ProductResponse } from "@/types/product";
import ListProduct from "./components/ListProduct";

export default function Page(){
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenProductModal, setIsOpenProductModal] = useState(false);
    const [typeProductAction, setTypeProductAction] = useState<ProductOperation>(ProductOperation.Create);
    const [product, setProduct] = useState<ProductResponse | null>(null);

    const selectModalCategorie = () =>{
        setIsOpen(true);
    }

    const openProductModal = () =>{
        setIsOpenProductModal(true);
    }

    return <>
        <div 
            className="w-full flex flex-col gap-2 p-4 bg-gray-50 items-start"
        >
            <div>
                <h4 className="text-gray-400 text-sm">Crea tus productos y sus categorías</h4>
            </div>
            <div className="w-full py-4">
                {/* Filtro de productos y creación de categorías */}
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col gap-4">
                        <Button 
                            variant={'default'}
                            onClick={()=>openProductModal()}
                        >
                            Registrar alimento
                        </Button>
                        <div>
                            <Input />
                        </div>
                    </div>
                    
                    <div>
                        <Button 
                            variant={'secondary'}
                            size={'sm'}
                            onClick={()=>selectModalCategorie()}

                        >Gestionar categorías</Button>
                    </div>
                </div>
                {/* Lista de productos */}
                <div className="w-full bg-sky-800">
                    <ListProduct />
                </div>
            </div>

            {/* Modal para gestionar productos */}
            <ModalProduct 
                isOpen={isOpenProductModal}
                onClosed={()=>setIsOpenProductModal(false)}
                action={typeProductAction}
                product={product}
            />

            {/* Modal para gestionar las categorías */}
            <ModalCategorie 
                isOpen={isOpen}
                onClose={()=>setIsOpen(false)}
            />
        </div>
    </>
}