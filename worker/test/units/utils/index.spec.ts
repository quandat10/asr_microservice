import { OBJECT_TYPE_ALBUM } from "@/constants/app"
import { decodeId, getLinks, isId, makeId } from "../../../src/utils"

describe("use bigint", () => {
    it("It should create bigint id", () => {
        const now = 1606794081000
        const b1 = makeId(now)

        const [type, time] = decodeId(b1)

        expect(time).toEqual(BigInt(now.toString()))
        expect(type).toEqual(BigInt(BigInt(OBJECT_TYPE_ALBUM)))
    })

    it("We can check type of id is album", () => {
        const b = 4084173758756038520n
        expect(isId(b)).toEqual(true)

        const b1 = BigInt("408417375875606")
        expect(isId(b1)).toEqual(false)
    })
})

describe("Generate links: next and prev", () => {
    it("We can create with offset is 0 and limit = 10 with current page equal limit", () => {
        const params = {
            limit: 10,
            offset: 0,
            user_id: 1
        }

        const currentPageNumberItem = 10

        const links = getLinks(params, currentPageNumberItem)

        expect(links.next).toEqual("limit=10&offset=10&user_id=1")
        expect(links.prev).toEqual("")
    })

    it("We can create with offset is 0 and limit = 10 with current page lower limit", () => {
        const params = {
            limit: 10,
            offset: 0,
            user_id: 1
        }

        const currentPageNumberItem = 0

        const links = getLinks(params, currentPageNumberItem)

        expect(links.next).toEqual("")
        expect(links.prev).toEqual("")
    })

    it("We can create with offset is 10 and limit = 10 with current page equal limit", () => {
        const params = {
            limit: 10,
            offset: 10,
            user_id: 1
        }

        const currentPageNumberItem = 10

        const links = getLinks(params, currentPageNumberItem)

        expect(links.next).toEqual("limit=10&offset=20&user_id=1")
        expect(links.prev).toEqual("limit=10&offset=0&user_id=1")
    })

    it("We can create with offset is 10 and limit = 10 with current page lower limit", () => {
        const params = {
            limit: 10,
            offset: 10,
            user_id: 1
        }

        const currentPageNumberItem = 7

        const links = getLinks(params, currentPageNumberItem)

        expect(links.next).toEqual("")
        expect(links.prev).toEqual("limit=10&offset=0&user_id=1")
    })
})
