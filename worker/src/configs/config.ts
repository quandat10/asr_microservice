// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
require("dotenv").config()

export const RabbitMq = {
    URI: process.env.RABBITMQ_URI
}

export const RabbitMqUpload = {
    URI: process.env.RABBITMQ_UPLOAD_URI
}

export const redis = {
    URI: process.env.REDIS_URI
}

export const sentryConfig = {
    URI: process.env.SENTRY_URI
}

const redisDb = process.env.REDIS_DB_QUEUE || 8
const uri = process.env.REDIS_URI || ""
const redisUri = uri.includes(":6379\\") ? uri : `${uri}/${redisDb}`

const Config = {
    SERVER_PORT: parseInt(process.env.PORT, 10),
    ENV: process.env.NODE_ENV,
    LOG_LEVEL: process.env.LOG_LEVEL,
    MYSQL_URI: process.env.MYSQL_URI,
    REDIS_URI: redisUri,
    MQTT_URI: process.env.MQTT_URI,
    MQTT_CERT: process.env.MQTT_CERT || "/app/cert/server-ca.crt",
    MQTT_USER: "base_worker",
    MQTT_PASSWORD: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzkzOTA2NTV9.LlaLbL4a2tkLJ26Dj_8lqmgCQ9QRVCJS1nHnjb-XjNg",
    ONE_SIGNAL_GENERAL_APP_ID: process.env.ONE_SIGNAL_GENERAL_APP_ID,
    ONE_SIGNAL_GENERAL_APP_KEY: process.env.ONE_SIGNAL_GENERAL_APP_KEY,
    MAIN_API: process.env.MAIN_API_URL,
    ADMIN_USER_ID: parseInt(process.env.ADMIN_USER_ID, 10),
    ADMIN_USER_CODE: process.env.ADMIN_USER_CODE,
}

export default Config

export const isEnv = (env: string): boolean => {
    return process.env.NODE_ENV === env
}

export const RETRY_CALL_POST_SERVICE = parseInt(process.env.RETRY_CALL_POST_SERVICE || "3", 10)

export enum RequestRoles {
    User = "user",
    Service = "service",
    Admin = "admin"
}
