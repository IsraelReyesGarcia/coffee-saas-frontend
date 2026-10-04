"use client"
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { queryKeys } from "@/constants/querykeys";
import { CategoryProducts } from "@/services/prodcut-category-services";
import { Label } from "@/components/ui/label";
import { Edit, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface CategoriesModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function ModalCategorie({
    isOpen,
    onClose
}:CategoriesModalProps){

    const[category, setCategory] = useState("");
    const[isEdit, setIsEdit] = useState(false);
    const[idProductSelected, setIdProductSelected] = useState<number>(0);

    const queryClient = useQueryClient();

    const {data: productCategories, isLoading} = useQuery({
        queryKey:[queryKeys.productCategories],
        queryFn: async () =>{
            const {data} = await CategoryProducts.getPaginated();
            return data;
        },
        //enabled: isOpen
    })


    const createCategory = async (value:string) => {
        const data = await CategoryProducts.createCategoryService(value);
        queryClient.invalidateQueries({queryKey:[queryKeys.productCategories]})
        setCategory("");
        if(data.status){
            toast.success(data.message);
        }else{
            toast.error(data.message);
        }
    }

    const editCategory = async (category:string) => {
        const data = await CategoryProducts.updateCategoryService(category, idProductSelected);
        queryClient.invalidateQueries({queryKey:[queryKeys.productCategories]})
        setCategory("");
        setIsEdit(false);
        if(data.status){
            toast.success(data.message);
        }else{
            toast.error(data.message);
        }
    }

    const deleteCategory = async (idCategory:number) => {
        const data = await CategoryProducts.deleteCategoryService(idCategory)
        queryClient.invalidateQueries({queryKey:[queryKeys.productCategories]})
        if(data.status){
            toast.success(data.message);
        }else{
            toast.error(data.message);
        }
    }

    const registerAction = (category:string) =>{
        if(isEdit){
            editCategory(category)
        }else{
            createCategory(category);
        }
    }

    return <>
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>
                        Gestiona las categorías de tus productos
                    </DialogTitle>
                    <DialogDescription>
                        Crea las categorías de tus productos, editalas o eliminalas.
                    </DialogDescription>
                </DialogHeader>
                <div className="px-2 py-2 flex flex-col gap-1">
                    {
                        isLoading ? (
                            <>
                                <div>Cargando</div>
                            </>
                        ):(
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-row justify-between gap-2">
                                    <Input 
                                        type="text"
                                        placeholder="Nueva categoría"
                                        value={category}
                                        onChange={(e)=>setCategory(e.target.value)}
                                    />
                                    <Button
                                        size={'sm'}
                                        onClick={()=>registerAction(category)}
                                    >
                                        {!isEdit ? 'Crear categoría' : "Editar categoría"} 
                                    </Button>
                                </div>
                                {
                                    <div>
                                        {
                                            productCategories?.map((category) => (
                                                <div key={category.productCategorieId} className="flex flex-row justify-between">
                                                <Label size={'sm'}>{category.category}</Label>
                                                <div
                                                    className="gap-2"
                                                >
                                                    <Button 
                                                        variant={"outline"}
                                                        onClick={()=>{
                                                            setIsEdit(true);
                                                            setCategory(category.category)
                                                            setIdProductSelected(category.productCategorieId);
                                                        }}
                                                    >
                                                        <Edit />
                                                    </Button>
                                                    <Button
                                                        variant={'destructive'}
                                                        onClick={()=>{
                                                            deleteCategory(category.productCategorieId);
                                                        }}
                                                    >
                                                        <Trash/>
                                                    </Button>
                                                </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                }
                            </div>
                        )
                    }
                </div>
                <DialogFooter>
                    <Button variant={'outline'} onClick={onClose}>Cancelar</Button>
                    <Button variant={'default'} >Aplicar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
}