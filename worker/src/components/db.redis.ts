import { injectable } from "inversify"
import Redis, { ValueType } from "ioredis"

import Config from "@/configs/config"

// noinspection JSUnusedGlobalSymbols
@injectable()
export default class DbRedis {
    static client: Redis.Redis
    static subscriber: Redis.Redis

    connect(override = true, options = {}): Redis.Redis {
        const tempClient = new Redis(Config.REDIS_URI, {
            maxRetriesPerRequest: 3,
            retryStrategy: times => {
                const delay = Math.min(times * 50, 2000)
                return times < 5 ? delay : null
            },
            ...options
        })

        tempClient.on("ready", () => {
            console.log("Redis connection established!")
        })

        tempClient.on("end", () => {
            console.log("Redis connection closed!")
        })

        tempClient.on("error", error => {
            console.log("error", error)
        })

        if (override) {
            DbRedis.client = tempClient
        }

        return tempClient
    }

    async getJobOptions(): Promise<Record<string, unknown>> {
        if (!DbRedis.subscriber) {
            DbRedis.subscriber = this.connect(false)
        }

        return {
            prefix: "",
            defaultJobOptions: {
                removeOnComplete: 20000,
                removeOnFail: 1000
            },
            createClient: (type: string) => {
                switch (type) {
                    case "client":
                        if (!DbRedis.client) {
                            DbRedis.client = this.connect(false)
                        }

                        return DbRedis.client
                    case "subscriber":
                        if (!DbRedis.subscriber) {
                            DbRedis.subscriber = this.connect(false)
                        }

                        return DbRedis.subscriber
                    default:
                        return this.connect(false)
                }
            }
        }
    }

    /**
     * @returns Promise
     */
    async disconnect(): Promise<boolean> {
        if (DbRedis.client) {
            await DbRedis.client.quit()
        }

        if (DbRedis.subscriber) {
            await DbRedis.subscriber.quit()
        }

        return true
    }

    /**
     * @param  {string} key
     * @param  {ValueType} data
     * @param  {number} optional expireTime
     * @returns Promise
     */
    async set(key: string, data: ValueType, expireTime = 60): Promise<void> {
        if (data !== null) {
            if (expireTime === 0) {
                await DbRedis.client.set(key, data)
            } else {
                await DbRedis.client.set(key, data, "EX", expireTime)
            }
        }
    }

    /**
     * @param key
     * @returns {Promise<any>}
     */
    async get<T>(key: string): Promise<T> {
        const data = await DbRedis.client.get(key)

        if (data !== null) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return JSON.parse(data)
        }

        return null
    }

    /**
     * @param  {string} key
     * @param  {unknown} data
     * @param  {number} Optional expireTime
     * @returns Promise
     */
    async setJson(key: string, data: ValueType | Record<string, unknown>, expireTime = 60): Promise<boolean> {
        if (data !== null) {
            if (expireTime === 0) {
                const result = await DbRedis.client.set(key, JSON.stringify(data))
                return result === "OK"
            } else {
                const result = await DbRedis.client.set(key, JSON.stringify(data), "EX", expireTime)
                return result === "OK"
            }
        }

        return false
    }

    /**
     * @param  {string} key
     * @returns Promise
     */
    async getJson<T>(key: string): Promise<T> {
        const data = await DbRedis.client.get(key)

        if (data !== null) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return JSON.parse(data) as T
        }

        return null
    }

    /**
     * @return int
     * @param key
     * @param field
     * @param value
     */
    async hSet(key: string, field: string, value: string | number): Promise<"OK"> {
        return DbRedis.client.hset(key, field, value)
    }

    /**
     * @param key
     * @param fields
     * @returns {Promise<*>}
     */
    async hmSet(key: string, fields: Map<string, ValueType>): Promise<"OK"> {
        return DbRedis.client.hmset(key, fields)
    }

    /**
     * @return string
     * @param key
     * @param field
     */
    async hGet(key: string, field: string): Promise<string> {
        return DbRedis.client.hget(key, field)
    }

    /**
     * @param key
     * @returns {Promise<*>}
     */
    async hGetAll(key: string): Promise<Record<string, string>> {
        return DbRedis.client.hgetall(key)
    }

    /**
     * @param name
     * @param key
     * @returns {Promise<*>}
     */
    async hDel(name: string, key: string): Promise<number> {
        return DbRedis.client.hdel(name, key)
    }

    /**
     * @param key
     * @returns {Promise<*|void>}
     */
    async delete(key: string): Promise<number> {
        return DbRedis.client.del(key)
    }

    /**
     * @param key
     * @param data
     * @returns {Promise<*>}
     */
    async lPush(key: string, data: string | number): Promise<number> {
        if (data !== null) {
            return DbRedis.client.lpush(key, data)
        }

        return 0
    }

    /**
     * @param key
     * @param data
     * @returns {Promise<*>}
     */
    async rPush(key: string, data: string | number): Promise<number> {
        if (data !== null) {
            return DbRedis.client.rpush(key, data)
        }

        return 0
    }

    /**
     * @param key
     * @returns {Promise<*>}
     */
    async lPop(key: string): Promise<string> {
        return await DbRedis.client.lpop(key)
    }

    /**
     * @param key
     * @returns {Promise<*>}
     */
    async rPop(key: string): Promise<string> {
        return await DbRedis.client.rpop(key)
    }

    /**
     * @param name
     * @param key
     * @param value
     * @returns {Promise<*>}
     */
    async inc(name: string, key: string, value: number): Promise<number> {
        return DbRedis.client.hincrby(name, key, value)
    }

    /**
     * @param  {string} key
     * @param  {string|number} value
     * @returns Promise
     */
    async sAdd(key: string, value: string | number | number[] | string[]): Promise<number> {
        if (value !== null) {
            return DbRedis.client.sadd(key, value)
        }

        return null
    }

    /**
     * @param  {string} key
     * @param  {string} value
     * @returns Promise
     */
    async sisMember(key: string, value: string): Promise<boolean> {
        if (value !== null) {
            const ret = await DbRedis.client.sismember(key, value)

            return !!ret;
        }

        return false
    }

    /**
     * @param  {string} key
     * @returns Promise
     */
    async sMember(key: string): Promise<string[]> {
        return DbRedis.client.smembers(key)
    }

    /**
     * @param  {string[]} keys
     * @param  {number[]} mapTo
     * @returns Promise
     */
    async gets<T>(keys: string[], mapTo: number[]): Promise<Map<number, T>> {
        const result = await DbRedis.client.mget(keys)

        const mapped: Map<number, T> = new Map<number, T>()

        mapTo.forEach((id, index) => {
            mapped.set(id, result[index] as unknown as T)
        })

        return mapped
    }

    /**
     * @param  {string} name
     * @param  {string[]} keys
     * @returns Promise
     */
    async hgets(name: string, keys: string[]): Promise<Map<unknown, unknown>> {
        const result = await DbRedis.client.hmget(name, keys)

        const map = new Map()

        keys.forEach((id, index) => {
            map.set(id, result[index])
        })

        return map
    }
}
