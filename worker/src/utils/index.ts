/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
  MAX_VAR,
  OBJECT_TYPE_ALBUM,
  START_TIME_CUSTOM_ID,
} from "@/constants/app"

const makeId = (current = Date.now()): bigint => {
    const typePart = BigInt(OBJECT_TYPE_ALBUM)
    const timePart = BigInt(current) - START_TIME_CUSTOM_ID
    const varPart = BigInt(Math.floor(Math.random() * MAX_VAR))
    return (typePart << 59n) | (timePart << 18n) | (varPart << 0n)
}

const decodeId = (input: bigint): bigint[] => {
    const typePart = (input >> 59n) & 0x1Fn // 1n
    const timePart = (input >> 18n) & 0x1FFFFFFFFFFn // 171017496261n
    const varPart = (input >> 0n) & 0x3FFFFn // 148505n
    return [typePart, timePart + BigInt(START_TIME_CUSTOM_ID), varPart]
}

const isId = (input: bigint[] | bigint): boolean => {
    return Array.isArray(input)
        ? input.length === 3 && input[0] === BigInt(OBJECT_TYPE_ALBUM) && input[1] > START_TIME_CUSTOM_ID && input[1] < Date.now()
        : isId(decodeId(input))
}

const getLinks = (params: Record<string, unknown>, currentItem: number): { next: string, prev: string } => {
    let next = ""
    let prev = ""

    const limit = Number(params.limit || 10)
    const offset = Number(params.offset || 0)

    Object.keys(params).forEach(key => {
        if (key === "offset") {
            if (offset > 0) {
                const prevOffset = offset - limit > 0 ? offset - limit : 0
                prev += prev === "" ? `${key}=${prevOffset}` : `&${key}=${prevOffset}`
            }

            if (currentItem >= limit) {
                const nextOffset = offset + limit
                next += next === "" ? `${key}=${nextOffset}` : `&${key}=${nextOffset}`
            }

        } else {
            if (currentItem >= limit) {
                next += next === "" ? `${key}=${params[key]}` : `&${key}=${params[key]}`
            }

            if (offset > 0) {
                prev += prev === "" ? `${key}=${params[key]}` : `&${key}=${params[key]}`
            }
        }
    })

    return { next, prev }
}

const sleep = (ms: number): Promise<unknown> => new Promise(resolve => setTimeout(resolve, ms))

export { decodeId, getLinks, isId, makeId, sleep }
