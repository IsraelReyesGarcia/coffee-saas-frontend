import { CategoryProduct } from "@/types/categoryProduct";
import axiosClient from '@/lib/axios';

export class CategoryProducts{
    /* Obtener las categorias */
    static async getPaginated():Promise<{data:CategoryProduct[]}>{
        const {data} = await axiosClient.get('/api/ProductCategorie');
        console.log("Las categorias son: ", data);
        return {data}
    }

    /* Crear las categorias */
    static async createCategoryService(category:string):Promise<{status:boolean, message:string}>{
        try {
            const response = await axiosClient.post(`/api/ProductCategorie`,{
                category:category
            });
            console.log("La respuesta es: ", response);
            return {
                status:true,
                message:"Categoría creada exitosamente"
            }
        } catch (error) {
            return {
                status:false,
                message:"No se pudo crear la categoría"
            }
        }
    }

    /* Actualizar categorías */
    static async updateCategoryService(category:string, idProductSelected:number):Promise<{status:boolean, message:string}>{
        try {
            const data = await axiosClient.patch(`/api/ProductCategorie/UpdateProductCategory/${idProductSelected}`,{
                productCategorieId:idProductSelected,
                category:category
            })
            console.log("La respuesta es: ", data);
            return {
                status: true,
                message: "El registro se edito exitosamente"
            }
        } catch (error) {
            return{
                status: false,
                message: "No se pudo editar la categoría"
            }
        }
    }

    /* Eliminar categoria */
    static async deleteCategoryService(idCategory:number):Promise<{status:boolean, message:string}>{
        try {
            const data = await axiosClient.delete(`/api/ProductCategorie/${idCategory}`);
            console.log("La data es: ", data);
            return {
                status:true,
                message: "La categoría fue eliminada satisfactoriamente"
            }
        } catch (error) {
            return{
                status:false,
                message: "Hubo un error al eliminar la categoría"
            }
        }
    }
}