import {
  Connection,
  createConnection,
} from "typeorm"

import Config from "@/configs/config"

export default class DbMysql {
    static conn: Connection

    static async connect(): Promise<boolean> {
        const uri = Config.MYSQL_URI

        console.log("Debug uri", uri, Config)
        try {
            DbMysql.conn = await createConnection({
                type: "mysql",
                url: uri,
                entities: [
                    __dirname + "/../entities/*{.ts,.js}"
                ],
                // synchronize: false,
            })
        } catch (e) {
            console.log("Debug", e)
            return false
        }

        return true
    }

    /**
     * Get Connection
     */
    static getConnection(): Connection {
        return DbMysql.conn
    }

    /**
     * disconnect connect pool
     */
    static async disconnect(): Promise<void> {
        if (DbMysql.conn) {
            return DbMysql.conn.close()
        } else {
            return
        }
    }
}
