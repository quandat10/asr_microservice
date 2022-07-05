import { PaginationDto } from "src/base/pagination.dto";
import { ErrorCodes } from "src/constants/error-code.const";
import { DatabaseError } from "src/exceptions/errors/database.error";
import {
  BaseEntity,
  DeleteResult,
  Repository,
} from "typeorm";
import { EntityId } from "typeorm/repository/EntityId";

import { LoggerService } from "../logger/custom.logger";
import { BaseServiceInterface } from "./base.service.interface";

export class BaseService<T extends BaseEntity, R extends Repository<T>> implements BaseServiceInterface<T> {
    protected readonly repository: R
    protected readonly logger: LoggerService

    constructor(repository: R, logger: LoggerService) {
        this.repository = repository
        this.logger = logger
    }

    index(): Promise<T[]> {
        return this.repository.find()
    }

    findById(id: EntityId): Promise<T> {
        return this.repository.findOne(id)
    }

    findByIds(ids: [EntityId]): Promise<T[]> {
        return this.repository.findByIds(ids)
    }

    delete(id: EntityId): Promise<DeleteResult> {
        return this.repository.delete(id)
    }

    async findOne(id: string, fields?: string[]): Promise<T> {
        return await this.repository.findOne(id, {
            select: (fields) ? fields as (keyof T)[] : null
        })
    }

    async paginate(page: number, limit: number, fields?: string[]): Promise<PaginationDto<T>> {
        const totalRecords = await this.repository.count()
        const totalPage = (totalRecords % limit) === 0 ? totalRecords / limit : Math.floor(totalRecords / limit) + 1

        if (page > totalPage || page <= 0)
            throw new DatabaseError(
                "PAGE_OUT_OF_RANGE",
                "Page number is out of range",
                ErrorCodes.PAGE_OUT_OF_RANGE)

        const offset = page === 1 ? 0 : limit * (page - 1)

        const data = await this.repository.find({
            select: (fields) ? fields as (keyof T)[] : null,
            skip: offset,
            take: limit
        })

        const next = (page < totalPage) ? `page=${page - -1}&limit=${limit}` : ""
        const prev = (page > 1) ? `page=${page - 1}&limit=${limit}` : ""

        return {
            data: data,
            meta: {
                pagination: {
                    currentPage: Number(page),
                    links: {
                        next: next,
                        prev: prev
                    },
                    limit: limit,
                    total: totalRecords,
                    totalPages: totalPage
                }
            }
        }

    }

}

