import { Exchanges } from "@/constants/subscribe.const"
import { Exchange } from "@/dtos/exchange.dto"

import { RabbitMq } from "./config"

export const RabbitTopology = {
    connection: {
        uri: RabbitMq.URI,
        replyQueue: false
    },
    exchanges: [
        new Exchange(Exchanges.POST_JOB, "direct", true),
        new Exchange(Exchanges.NOTIFICATION, "direct", true),
    ]
};
