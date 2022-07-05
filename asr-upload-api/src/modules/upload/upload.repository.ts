import { Upload } from "src/entities/Upload";
import {
  EntityRepository,
  Repository,
} from "typeorm";

@EntityRepository(Upload)
export class UploadRepository extends Repository<Upload> {

}
