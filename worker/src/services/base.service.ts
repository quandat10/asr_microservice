import { injectable } from "inversify"
import {
  FindConditions,
  FindOneOptions,
  ObjectLiteral,
  Repository,
} from "typeorm"

@injectable()
export class BaseService<E extends ObjectLiteral> {

    protected repository: Repository<E>

    /**
     * @param id 
     * @param options 
     * @returns 
     */
    async findOne(id?: string | number | Date, options?: FindOneOptions<E>): Promise<E> {
        return this.repository.findOne(id)
    }

    /**
     * @param {FindConditions<T>} conditions 
     * @param {FindOneOptions<T>} options 
     * @returns Promise<T>
     */
    async getOne(conditions?: FindConditions<E>, options?: FindOneOptions<E>): Promise<E> {
        return this.repository.findOne(conditions, options)
    }

    /**
     * @param conditions 
     * @param options 
     * @returns 
     */
    async find(conditions?: Record<string, undefined>, options?: Record<string, unknown>): Promise<E[]> {

        const conds: Record<string, unknown> = {
            cache: false
        }

        conds.take = options && options.limit ? options.limit : 10
        conds.skip = options && options.offset ? options.offset : 0

        if (conditions) conds.where = options.conditions
        if (options && options.relations) conds.relations = options.relations
        if (options && options.select) conds.select = options.select
        if (options && options.order) conds.order = options.order

        return this.repository.find(conds)
    }

    /**
     * @param  {string} query
     * @param  {unknown[]} parameters?
     * @returns Promise
     */
    async query(query: string, parameters?: unknown[]): Promise<unknown> {
        return this.repository.query(query, parameters)
    }
}

