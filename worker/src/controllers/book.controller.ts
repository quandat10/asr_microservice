/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Context,
  Get,
} from "#/core"
import { injectable } from "inversify"
import getDecorators from "inversify-inject-decorators"

import { container } from "../components/di.container"
import {
  parseQueryParams,
  validRequest,
} from "../middlewares/genneral.middleware"
// import { BookService } from "../services/book.service"
import ExternService from "../services/extern.service"
import BaseController from "./base.controller"

const { lazyInject } = getDecorators(container)


// @PrefixController("/books")
@injectable()
export default class BookController extends BaseController {
    // @lazyInject(TYPES.cdnUtil)
    // @lazyInject(TYPES.bookService)
    // bookService: BookService

    @lazyInject(ExternService)
    externService: ExternService


    /**
     * Get index
     *
     * @param {Context} ctx
     */
    @Get("/danh-sach/:content", validRequest, parseQueryParams)
    async list(ctx: Context): Promise<void> {
        try {
            const OneDriveAuth = require("onedrive-auth");

            // create OneDrive client
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            const onedrive = new OneDriveAuth({
                clientId: "b5153c6e-8254-4d1a-8674-809cca47ab2e",
                scopes: "onedrive.readwrite offline_access onedrive.appfolder onedrive.readwrite",
                redirectUri: "https://localhost",
            });

            console.log("Debug", onedrive)
            // onedrive.auth().then((token: unknown) => {
            //     console.log("Debug", token)
            // }).catch((err: unknown) => {
            //     console.log("Debug", err)
            // });

            // var OnedriveApi = require("@lucafont2/onedrive-api")

            // void (async function () {
            //     const a = "M.R3_BAY.CeMC*cetHk5aREb5N85spJguI*f5La0Z2zbj6F8h!0Kt2N*EQWW!PvfnC1wuHMotJeoQzLtQA9kSLvIz1X3ppjbRTz9Z9UeU5!9XWD5gGVuPDMlb4ED3RMH*zzjqEhn1znG13GEAnYErs5RCqq6!Kzaf0w0MAZMampgywIBEyPLou0hiAeJLiN4xXoO1!axqRREjbgS9a4319KOoKWpdIf2L2cJe0S0sbiGfF4OOESwvIo7kYvZDlClA!FcmBV3*aiNWX2mih2HdbBBNOFKIhg*7dSbdrdSWGA3ayXLEg1d30L1inQdRL7BBKv2hJbSplNrI*5oYGrIPzo0xK2nHzkIsneIDmqCqSDrJ8URdaYhVwiVSBUfvMLhhx!6*zbwn2epSGPo7m1KpkRAwI2Bn5Z0$"
            //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            //     // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            //     const onedrive = new OnedriveApi(a, async function (error: unknown, userInfo: unknown) {
            //         console.log("Debug", userInfo)
            //         if (error) {

            //             throw error;
            //         }

            //         const drives = await onedrive.getDrives();
            //         console.log(drives);
            //         const drive = await onedrive.getDrive(drives[0]["id"]);
            //         console.log(drive);
            //         const dirchil = await onedrive.getDirChildren(drives[0]["id"], "/Media/StockAll/____chuot")
            //         console.log("Debug", dirchil)

            //         const dl = await onedrive.downloadFileById(drives[0]["id"], "C4541A6DE020EA5D!13374", "/Volumes/Data/Nodes/web-orm-mysql")
            //         console.log("Debug", dl)
            //     })
            // })();

        } catch (e) {
            console.log("Debug", e)
        }

        // const book = await this.bookService.getBook(1)
        // console.log("Log:", ctx.params.book_id)

        // console.log(await this.externService.getTopStrade())

        ctx.end(200, {
            "success": true,
            "data": ctx,
            "message": "Request thanh cong"
        })
    }

    /**
     * Get index
     *
     * @param {Context} ctx
     */
    @Get("/sach/:book_id/:name", validRequest, parseQueryParams)
    async index1(ctx: Context): Promise<void> {
        // const book = await this.bookService.getBook(1)
        console.log("Log:", ctx.params.book_id)

        // console.log(await this.externService.getTopStrade())

        ctx.end(200, {
            "success": true,
            "data": ctx,
            "message": "Request thanh cong"
        })
    }

    /**
     * Get index
     *
     * @param {Context} ctx
     */
    @Get("/chuyen-muc/", validRequest)
    async index(ctx: Context): Promise<void> {
        // const book = await this.bookService.getBook(1)
        // console.log("Log:", book)

        console.log(await this.externService.getTopStrade())

        ctx.end(200, {
            "success": true,
            // "data": book,
            "message": "Request thanh cong"
        })
    }

    /**
     * Get index
     *
     * @param {Context} ctx
     */
    @Get("/all", validRequest)
    async all(ctx: Context): Promise<void> {


        console.log("all")

        // const book = await this.bookService.getBook(1)
        // const books = await this.bookService.find();

        ctx.end(200, {
            "success": true,
            // "data": books,
            "message": "Request thanh cong"
        })
    }
}
