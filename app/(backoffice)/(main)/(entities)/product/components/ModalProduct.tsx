"use client"

import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Product, ProductOperation, ProductResponse } from "@/types/product"
import { useState } from "react"
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from "@/constants/querykeys"
import { CategoryProducts } from "@/services/prodcut-category-services"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { CategoryProduct } from "@/types/categoryProduct"
import { toast } from "sonner"
import { ProductServices } from "@/services/product-services"

interface ProductModalProps{
    isOpen: boolean
    onClosed: ()=>void
    action:string
    product:ProductResponse | null
}

export default function ModalProduct({isOpen, onClosed, action, product}:ProductModalProps){
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState<CategoryProduct | null>(null);
    const [listImages, setListImages] = useState<File | null>(null);

    const queryClient = useQueryClient();

    /* Obtenemos las categorías */
    const {data:categoryList, isLoading:isLoadingCategory} = useQuery({
        queryKey:[queryKeys.productCategories],
        queryFn:async()=>{
            const {data} = await CategoryProducts.getPaginated();
            return data
        }
    });

    /* Crear producto */
    const registerProduct = async()=>{
        if(!category){
            toast.error("Seleccione una categoría");
            return;
        }

        const data = await ProductServices.createProduct({
            Name:name,
            Price:price,
            Description:description,
            ProductCategoryId:category!.productCategorieId}
        );

        if(data.status){
            toast.success("Producto creado correctamente");
            queryClient.invalidateQueries({queryKey:[queryKeys.listProduct]});
            /* Reestablecemos los valores de los estados */
            setName("");
            setPrice(0);
            setDescription("");
            setCategory(null);

            onClosed();
        }else{
            toast.error("Algo salió mal al registrar tu producto, envía todos los campos");
        }
    }

    const handleSubmit = (e:React.SubmitEvent<HTMLFormElement>) =>{
        e.preventDefault();
        console.log("La acción es:", action);
        switch(action){
            case ProductOperation.Create: registerProduct()
                break;
            default:
                toast.info("No se encontró la opción: " + action);
        }
    }

    return <>
        <Dialog open={isOpen} onOpenChange={onClosed}>
            <DialogContent size={'md'}>
                <DialogHeader>
                    <DialogTitle>Registra tus alimentos</DialogTitle>
                    <DialogDescription>Al registrar tus alimentos asocialos a una categoría</DialogDescription>
                </DialogHeader>
                <div
                    className="flex flex-col gap-1 p-2"
                >
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-row justify-between gap-2">
                            <div className="w-1/2 flex flex-col gap-1">
                                <Label size={'sm'}>Ingrese el nombre *</Label>
                                <Input 
                                    type="text"
                                    placeholder="Nombre"
                                    required
                                    value={name}
                                    onChange={(e)=>setName(e.target.value)}
                                />
                            </div>
                            <div className="w-1/2 flex flex-col gap-1">
                                <Label size={'sm'}>Ingrese el precio *</Label>
                                <Input 
                                    type="number"
                                    placeholder="Precio"
                                    required
                                    value={price}
                                    onChange={(e)=>setPrice(Number(e.target.value))}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row justify-between gap-2">
                            <div className="w-1/2 flex flex-col gap-1">
                                <Label size={'sm'}>Ingrese una descripción </Label>
                                <Textarea 
                                    placeholder="Descripción"
                                    value={description}
                                    onChange={(e)=>setDescription(e.target.value)}
                                />
                            </div>
                            {isLoadingCategory ? (
                                <div className="w-1/2 flex flex-col gap-1">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-6 w-full" />
                                </div>
                            ):(
                                <div className="w-1/2 flex flex-col gap-1">
                                    <Label size={'sm'}>Seleccione la categoría de su alimento*</Label>
                                    <Combobox 
                                        items={categoryList}
                                        value={category}
                                        onValueChange={(value)=>setCategory(value)}
                                        itemToStringLabel={(item)=>item.category}
                                        isItemEqualToValue={(item, value) => item.productCategorieId === value.productCategorieId}
                                    >
                                        <ComboboxInput placeholder="Seleccione la categoría del alimento" />
                                        <ComboboxContent>
                                            <ComboboxEmpty>No se encontró la categoría</ComboboxEmpty>
                                            <ComboboxList>
                                                {(item: CategoryProduct) => (
                                                    <ComboboxItem key={item.productCategorieId} value={item}>
                                                        {item.category}
                                                    </ComboboxItem>
                                                )
                                                }
                                            </ComboboxList>
                                        </ComboboxContent>
                                    </Combobox> 
                                </div>
                            )   

                            }

                            
                            
                        </div>
                        {/* Adjuntar imágenes */}
                        <div className="flex flex-col gap-2 pt-5">
                            <Label>Sube las imágenes de tu alimento (opcional)</Label>
                            
                        </div>
                        <div className="flex justify-between gap-4 pt-5">
                            <Button
                                variant={'destructive'}
                                type="button"
                                onClick={onClosed}
                            >
                                Cancelar
                            </Button>

                            <Button
                                variant={'default'}
                                type="submit"
                            >
                                Registrar alimento
                            </Button>
                        </div>
                    </form>
                    
                </div>
            </DialogContent>
        </Dialog>
    </>
}