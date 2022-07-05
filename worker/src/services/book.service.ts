// import { injectable } from "inversify"
// import {
//   getRepository,
//   Repository,
// } from "typeorm"

// import { BaseService } from "./base.service"

// @injectable()
// export class BookService extends BaseService<Book> {

//     protected bookRepository: Repository<Book>

//     /**
//      * Constructor Album
//      */
//     constructor() {
//         super()

//         this.bookRepository = getRepository(Book)
//     }

//     /**
//      * @param id 
//      * @returns 
//      */
//     async getBook(id: number): Promise<Book> {
//         return this.bookRepository.findOne(id)
//     }
// }

