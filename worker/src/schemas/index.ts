// import {
//   AlbumPrivacy,
//   AlbumType,
//   MediaPrivacy,
//   MediaType,
// } from "@/enums/app_enum"

// export const NewAlbumSchema = {
//     $$strict: true, // no additional properties allowed
//     type: { type: "enum", values: [AlbumType.NORMAL, AlbumType.COVER, AlbumType.AVATAR, AlbumType.TIMELINE] }, // 0:normal, 1:avatar 2: cover, 3: timeline
//     title: { type: "string" },
//     privacy: { type: "enum", values: [AlbumPrivacy.PRIVATE, AlbumPrivacy.FRIEND, AlbumPrivacy.PUBLIC] }, // 1:private, 2: friend, 3: public
//     avatar: { type: "string" },
//     alter_avatar: { type: "string", optional: true },
//     description: { type: "string" }
// }

// export const UpdateAlbumSchema = {
//     $$strict: true, // no additional properties allowed
//     // type: { type: "enum", values: [AlbumType.NORMAL, AlbumType.COVER, AlbumType.AVATAR, AlbumType.TIMELINE], optional: true }, //0:normal, 1:avatar 2: cover, 3: timeline
//     title: { type: "string", optional: true },
//     privacy: { type: "enum", values: [AlbumPrivacy.PRIVATE, AlbumPrivacy.FRIEND, AlbumPrivacy.PUBLIC], optional: true }, // 1:private, 2: friend, 3: public
//     avatar: { type: "string", optional: true },
//     alter_avatar: { type: "string", optional: true },
//     description: { type: "string", optional: true }
// }

// export const MediaImageInser = {
//     media_id: { type: "string", stringMin: 30, stringMax: 40 },
//     album_id: { type: "string", stringNumeric: true, stringLength: 19 },
//     post_id: { type: "string", stringNumeric: true, stringLength: 19 },
//     old_post_id: { type: "string", optional: true },
//     type: { type: "enum", values: [MediaType.IMAGE, MediaType.VIDEO] }, // 1:private, 2: friend, 3: public
//     store: { type: "string" },
//     src: { type: "string" },
//     width: { type: "number" },
//     height: { type: "number" },
//     privacy: { type: "enum", values: [MediaPrivacy.PRIVATE, MediaPrivacy.FRIEND, MediaPrivacy.PUBLIC] },
//     metadata: { type: "string", stringMax: 500, optional: true }
// }

// export const MediaVideoInsert = {
//     media_id: { type: "string", stringMin: 30, stringMax: 40 },
//     album_id: { type: "string", stringNumeric: true, stringLength: 19 },
//     post_id: { type: "string", stringNumeric: true, stringLength: 19 },
//     old_post_id: { type: "string", optional: true },
//     type: { type: "enum", values: [MediaType.IMAGE, MediaType.VIDEO] }, // 1:private, 2: friend, 3: public
//     store: { type: "string" },
//     src: { type: "string" },
//     width: { type: "number" },
//     height: { type: "number" },
//     privacy: { type: "enum", values: [MediaPrivacy.PRIVATE, MediaPrivacy.FRIEND, MediaPrivacy.PUBLIC] },
//     duration: { type: "number" },
//     thumb_url: { type: "string" },
//     thumb_width: { type: "number" },
//     thumb_height: { type: "number" },
//     metadata: { type: "string", stringMax: 500, optional: true }
// }

// export const VideoTrancodeInfo = {
//     id: { type: "string", stringMin: 36, stringMax: 40 },
//     file_link: { type: "string" },
//     status: { type: "enum", values: ["SUCCESS", "ERROR"] },
//     type: { type: "string" },
//     store: { type: "string" },
//     src: { type: "string" },
//     media_id: { type: "string" },
//     video_id: { type: "string" },
//     thumb: {
//         type: "object", strict: true, props: {
//             width: { type: "number" },
//             height: "number", // short-hand
//             src: "string" // short-hand
//         }
//     },
//     duration: { type: "number" },
//     resolutions: { type: "array", items: "string" },
// }