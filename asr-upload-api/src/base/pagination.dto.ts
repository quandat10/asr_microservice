export class PaginationDto<T> {
    data: T[]
    meta: {
        pagination: {
            currentPage: number
            links: {
                next: string
                prev: string
            }
            limit: number
            total: number
            totalPages: number
        }
    }
}
export class PaginationOption {
    code: string
    page: number
    limit: number
    fields: string
}