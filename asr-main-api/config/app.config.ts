import data from "./appconfig.json";

export default (): Record<string, unknown> => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    apiPrefix: process.env.API_PREFIX,
    language: "vi",
    redisUri: process.env.REDIS_URI,
    rabbitmqUri: process.env.RABBITMQ_URI,
    exchangeName: process.env.EXCHANGE_NAME,
    exchangeType: process.env.EXCHANGE_TYPE,
    SENTRY_DSN: process.env.SENTRY_DSN,
    KAFKA_BROKER: process.env.KAFKA_BROKER,
    TOPIC:"asr_stream",
})

export const configuration = data;