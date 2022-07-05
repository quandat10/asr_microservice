import {
  Context,
  Get,
  PrefixController,
} from "#/core"
import { injectable } from "inversify"

import { validRequest } from "@/middlewares/genneral.middleware"

import BaseController from "./base.controller"

// const { lazyInject } = getDecorators(container)


@PrefixController("/albums")
@injectable()
export default class AlbumController extends BaseController {
    // @lazyInject(TYPES.cdnUtil)
    // albumService: AlbumService

    /**
     * Get index
     *
     * @param {Context} ctx
     */
    @Get("/", validRequest)
    async index(ctx: Context): Promise<void> {
        // const userRepository = getRepository(Album) // you can also get it via getConnection().getRepository() or getManager().getRepository()
        // const album = await userRepository.findOne()


        // console.log("Debug->>>>>>>>>>>>>>>>>>>>>", album)
        // album.title = "album"
        // try {
        //     const ret = await userRepository.save(album)
        //     console.log("debug->>>>>>>>>>>>>>>>>>>>>", ret)

        // } catch (e) {
        //     console.log("Debug", e)
        // }

        ctx.end(200, {
            "success": true,
            "message": "Request thanh cong"
        })
    }
}
