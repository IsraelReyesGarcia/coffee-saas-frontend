"use client"
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { queryKeys } from "@/constants/querykeys";
import { ProductServices } from "@/services/product-services";
import { ProductResponse } from "@/types/product";
import { useQuery } from "@tanstack/react-query";

export default function ListProduct(){

    /* Consulto mis alimentos */
    const {data:listProduct, isLoading:isLoadingListProduct} = useQuery({
        queryKey: [queryKeys.listProduct],
        queryFn:async()=>{
            const data = ProductServices.getProductPaginated({pageNumber:1, pageSize:10, searchText:""});
            return data
        }
    })
    return <>
        <div className="py-2  ">
            {isLoadingListProduct ?(
                <div className="w-full flex justify-center items-center">
                    <Badge variant={'default'}>
                        <Spinner data-icon="inlinne-start"/>
                    </Badge>
                </div>
            ):(
                <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,240px))] justify-center gap-4">
                    {listProduct?.data?.data.map((product:ProductResponse) => (
                        <Card key={product.productId}>
                            <CardHeader>
                                <CardTitle>{product.name}</CardTitle>
                                <CardDescription>{product.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <label>Precio</label>
                                <label>${product.price}</label>
                            </CardContent>
                        </Card>
                    ))
                    }
                </div>
            )}
        </div>
    </>
}