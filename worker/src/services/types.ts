/* eslint-disable */
// noinspection JSUnusedLocalSymbols
interface Named {
    getName(): string
}

// noinspection JSUnusedLocalSymbols
interface AlbumController { }

interface MessageComponent { }

// noinspection JSUnusedLocalSymbols
interface LoggerService { }
// noinspection JSUnusedLocalSymbols
interface AlbumService { }

interface SettingService { }
interface JobApplyingService { }
interface HotJobCategoryService { }
interface InAppMessageService { }
interface OneSignalApiService { }

interface CheckJobExpiredService { }

// noinspection JSUnusedLocalSymbols
interface MediaService { }

// noinspection JSUnusedLocalSymbols
interface DbPostgress { }
// noinspection JSUnusedLocalSymbols
interface DBRedis { }
// noinspection JSUnusedLocalSymbols


interface CdnUtil { }

// noinspection JSUnusedLocalSymbols
interface Media { }
// noinspection JSUnusedLocalSymbols
interface SendMessageInAppService { }

const TYPES = {
    albumController: Symbol.for("AlbumController"),

    messageComponent: Symbol.for("MessageComponent"),

    loggerService: Symbol.for("LoggerService"),
    settingService: Symbol.for("SettingService"),
    bookService: Symbol.for("BookService"),
    mediaService: Symbol.for("MediaService"),

    uploadAsrService: Symbol.for("UploadAsrService"),


    dbRedis: Symbol.for("DBRedis"),



    cdnUtil: Symbol.for("CdnUtil")
}

export default TYPES
