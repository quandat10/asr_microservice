import {
  Exchanges,
  RabbitMqQueues,
  RoutingKeys,
} from "@/constants/subscribe.const"
import { Exchange } from "@/dtos/exchange.dto"

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { RabbitTopology } from "./publisher"

const subscriberConfig: Record<string, unknown> = { ...RabbitTopology }

const exchanges = RabbitTopology.exchanges as unknown as Exchange[]

subscriberConfig.exchanges = [
    ...exchanges,
]

subscriberConfig.queues = {
    name: `${RabbitMqQueues.LISTEN_POST_JOB_EVENT}`,
    subscribe: true,
    limit: 5,
    durable: true,
    // expires: 172800000, // 2 days
    noAck: true
    // unique: 'consistent'
}

subscriberConfig.bindings = [
    {
        exchange: Exchanges.POST_JOB,
        target: `${RabbitMqQueues.LISTEN_POST_JOB_EVENT}`,
        keys: RoutingKeys.CREATED
    }
]

export default subscriberConfig
