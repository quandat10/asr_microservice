import { Container } from "inversify"

// import { AlbumService } from "@/services/album.service"
import { LoggerService } from "@/services/logger.service"

// import { BookService } from "../services/book.service"
import ExternService from "../services/extern.service"
import TYPES from "../services/types"
import DbRedis from "./db.redis"
import { MessageComponent } from "./message.component"

const container = new Container({ skipBaseClassChecks: true })

// inject service
container.bind<LoggerService>(TYPES.loggerService).to(LoggerService).inSingletonScope()
container.bind<MessageComponent>(TYPES.messageComponent).to(MessageComponent).inSingletonScope()

// container.bind<BookService>(TYPES.bookService).to(BookService).inSingletonScope()
// container.bind<MediaService>(TYPES.mediaService).to(MediaService).inSingletonScope()
container.bind<ExternService>(ExternService).toSelf()
container.bind<DbRedis>(TYPES.dbRedis).to(DbRedis).inSingletonScope()

// inject util
// inject model
// container.bind<Media>(TYPES.media).to(Media)
// let { lazyInject } = getDecorators(container);
// container.bind<AlbumController>(TYPES.albumController).to(AlbumController)
export { container }
