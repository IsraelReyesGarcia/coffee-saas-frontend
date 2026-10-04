import { CreateProduct, ProductResponse } from "@/types/product";
import axiosClient from '@/lib/axios';
import { PaginationResponse } from "@/types/pagination";

interface paramsPageRequest{
    pageNumber:number,
    pageSize:number,
    searchText?:string
}

export class ProductServices{
    /* Registrar el alimento */
    static async createProduct({Name, Price, Description,ProductCategoryId}:CreateProduct):Promise<{status:boolean, message:string}>{
        try {
            const data = await axiosClient.post('/api/Product',{
                Name,
                Price,
                Description,
                ProductCategoryId
            })
            console.log("El resultado de creación es: " , data);
            return {
                status:true,
                message:"El alimento se registró exitosamente"
            }
        } catch (error) {
            return{
                status:false,
                message:"Error al registrar el producto, confirmar que se envíen todos los campos"
            }
        }
    }

    static async getProductPaginated({pageNumber=1, pageSize=10, searchText=""}:paramsPageRequest):Promise<{status?:boolean, message?:string, data?:PaginationResponse<ProductResponse>}>{
        const params ={
            pageNumber:pageNumber,
            pageSize:pageSize,
            searchText:searchText
        }
        try {
            const response = await axiosClient.get(`/api/Product/Paged`,{ params });
            return {
                data:response.data
            }
        } catch (error) {
            return {
                status:false,
                message:"algo salió mal al consultar los registros"
            }
        }
    }
}