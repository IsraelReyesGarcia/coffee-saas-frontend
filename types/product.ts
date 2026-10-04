export enum ProductOperation{
    Create = 'Create',
    Read ='Read',
    Update = 'Update'
}

export interface Product{
    ProductId:number
    Name:string
    Price:number
    Description:string
    CreateAt:Date
    UpdateAt:Date
    ProductCategoryId:number
}

export interface CreateProduct{
    Name:string
    Price:number
    Description:string
    ProductCategoryId:number
}

export interface ProductResponse{
    productId:number
    name:string
    price:number
    description:string
    createAt:Date
    updateAt:Date
    productCategoryId:number
    productCategorie:string
}