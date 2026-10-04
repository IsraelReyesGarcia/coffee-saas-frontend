export interface PaginationResponse<T>{
    pageNumber: number,
    pageSize: number,
    total: number,
    totalPages: number,
    data:T[]
}