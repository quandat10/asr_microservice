import {
  BaseEntity,
  Column,
  Entity,
  Index,
} from "typeorm";

@Entity("upload")
export class Upload extends BaseEntity {
    @Column("int", { primary: true, generated: "increment", name: "id" })
    id: number

    @Column("varchar", { name: "original_name" })
    originalName: string

    @Index()
    @Column("varchar", { name: "cloud_file_name" })
    cloudFileName: string

    @Column("varchar", { name: "encoding" })
    encoding: string

    @Column("varchar", { name: "mimetype" })
    mimetype: string

    @Column("varchar", { name: "bucket" })
    bucket: string

    @Column("int", { name: "size" })
    size: number

    @Column("varchar", { name: "user_code" })
    userCode: string

    @Column("varchar", { name: "link_url" })
    linkUrl: string

    @Column("timestamp", {
        name: "created_at",
        default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: Date;

    constructor(partial: Partial<Upload>) {
        super();
        Object.assign(this, partial);
    }
}
