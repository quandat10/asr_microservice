import { EntityId } from "typeorm/repository/EntityId"
import { DeleteResult } from "typeorm"

export interface BaseServiceInterface<T> {
  index(): Promise<T[]>

  findById(id: EntityId): Promise<T>

  findByIds(id: [EntityId]): Promise<T[]>

  delete(id: EntityId): Promise<DeleteResult>
}
