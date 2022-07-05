import { camelCase } from "change-case"
import moment from "moment"

/**
 * @param  {string} Optional className="fields"
 * @param  {unknown} Optional defaultValue
 * @returns PropertyDecorator
 */
export function Property(className = "fields", defaultValue: unknown = undefined): PropertyDecorator {
    return (target: Record<string, unknown>, name: string, descriptor: PropertyDescriptor = null): void => {
        if (defaultValue !== undefined) {
            target[name] = defaultValue
        }

        Reflect.defineMetadata(className, true, target, name)
    }
}

/**
 * @param  {string} str
 * @returns string
 */
export const telephoneCheckAndGet = (str: string): string | null => {
    const phone = str.replace(/[^0-9]/g, "")

    const isPhone = /^($|(084|84|))(0?[3|5|7|8|9])([0-9]{8})\b/g.test(phone)

    if (isPhone) {
        return toStandard(phone)
    }

    return null
}

/**
 * @param  {string} phone
 */
const toStandard = (phone: string) => {
    if (phone.length === 10 && phone[0] === "0") {
        return `84${phone}`.replace(/840/g, "84")
    } else {
        let p = phone
        if (p[0] === "0") {
            p = p.replace(/084/g, "84")
        }

        if (p[2] === "0") {
            p = p.replace(/840/g, "84")
        }

        return p
    }
}

/**
 * @param  {string} str
 */
export const toSnakeCase = (str: string): string => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)

/**
 * @param  {number} min
 * @param  {number} max
 * @returns number
 */
export const getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * @param  {string} str
 * @param  {string} trim_str
 * @param  {boolean} Option camelcase=false
 * @returns string
 */
export const trim = (str: string, trim_str: string, camelcase = false): string => {
    const reg = new RegExp(`^${trim_str}+|${trim_str}+$`, "gm")

    return camelCase(str.replace(reg, ""))
}

/**
 * @param  {} second=true
 * @returns number
 */
export const currentTimestamp = (second = true): number => {
    if (second) {
        return Math.round(Date.now() / 1000)
    }

    return Date.now()
}

/**
 * @param  {} second=true
 * @returns string
 */
export const startTimeOfDay = (second = true): string | number => {

    if (second) {
        return moment().utcOffset(7).startOf("day").unix()
    }

    return moment().utcOffset(7).startOf("day").format("x")
}

/**
 * @param  {number} m
 * @returns number
 */
export const convertMtoKm = (m: number): number => {
    return Math.round(m * 100 / 1000) / 100
}

const mapBinary = new Map([
    [1, 0b000000000000000000000000000001], // 1
    [2, 0b000000000000000000000000000010], // 2
    [3, 0b000000000000000000000000000100], // 4
    [4, 0b000000000000000000000000001000], // 8
    [5, 0b000000000000000000000000010000], // 16
    [6, 0b000000000000000000000000100000], // 32
    [7, 0b000000000000000000000001000000], // 64
    [8, 0b000000000000000000000010000000], // 128
    [9, 0b000000000000000000000100000000], // 256
    [10, 0b000000000000000000001000000000],// 512
    [11, 0b000000000000000000010000000000],// 1024
    [12, 0b000000000000000000100000000000],// 2018
    [13, 0b000000000000000001000000000000],// 4096
    [14, 0b000000000000000010000000000000],// 8192
    [15, 0b000000000000000100000000000000],// 16384
    [16, 0b000000000000001000000000000000],// 32768
    [17, 0b000000000000010000000000000000],// 65536
    [18, 0b000000000000100000000000000000],// 131072
    [19, 0b000000000001000000000000000000],// 262144
    [20, 0b000000000010000000000000000000],// 524288
    [21, 0b000000000100000000000000000000],// 1048576
    [22, 0b000000001000000000000000000000],// 2097152
    [23, 0b000000010000000000000000000000],// 4194304
    [25, 0b000001000000000000000000000000],// 16777216
    [26, 0b000010000000000000000000000000],// 33554432
    [27, 0b000100000000000000000000000000],// 67108864
    [28, 0b001000000000000000000000000000],// 134217728
    [29, 0b010000000000000000000000000000],// 268435456
    [30, 0b100000000000000000000000000000],// 536870912
])

/**
 * @param  {number[]} days
 * @returns number
 */
export const convertDaysToBinary = (days: number[]): number => {
    if (!days || days.length === 0) {
        return 0
    }

    let total = 0
    days.forEach(day => {
        total = total | mapBinary.get(day)
        // console.log("Debug", total)
    })

    return total
}

/**
 * @param  {number} n
 * @returns number
 */
export const bitCount = (n: number): number => {
    let bits = 0
    while (n !== 0) {
        bits += bitCount32(n | 0)
        n /= 0x100000000
    }

    return bits
}

/**
 * @param  {number} n
 * @returns number
 */
export const bitCount32 = (n: number): number => {
    n = n - ((n >> 1) & 0x55555555)
    n = (n & 0x33333333) + ((n >> 2) & 0x33333333)

    return ((n + (n >> 4) & 0xF0F0F0F) * 0x1010101) >> 24
}

/**
 * @param  {T[]} a
 * @returns T
 */
export function uniq<T>(a: T[]): T[] {
    return Array.from(new Set(a))
}

/**
 * @param  {number} ms
 * @returns Promise
 */
export const sleep = async (ms: number): Promise<unknown> => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

/**
 * @param  {string} key
 * @returns string
 */
export function cleanCrt(key: string): string {
    if (!key || typeof key !== "string") return key;

    const lines = key.split(/\r?\n/);
    if (lines.length !== 1) return key;

    const wrappedKey = [
        "-----BEGIN CERTIFICATE-----",
        ...key.match(/.{1,64}/g),
        "-----END CERTIFICATE-----",
        ""
    ].join("\n");

    return wrappedKey;
}

/**
 * @param  {number} time
 * @param  {boolean} Optional second=true
 * @returns number
 */
export const startTimeOfADay = (time: number, second = true): number => {

    if (second) {
        return moment(time).utcOffset(7).startOf("day").unix()
    }

    const timeMilisecon = moment(time).utcOffset(7).startOf("day").format("x")

    return parseInt(timeMilisecon)
}
