import {
  Connection,
  Exchange,
  Message,
} from "amqp-ts"
// import { RabbitMqExchanges } from "@/constants/app"
import Bluebird from "bluebird"

import { RabbitTopology } from "@/configs/publisher"
import subscriberConfig from "@/configs/subscriber"
import {
  Exchanges,
  RoutingKeys,
} from "@/constants/subscribe.const"
import { MessageNotificationDto } from "@/dtos/message.notification.dto"
import { NotifcationDto } from "@/dtos/notification.dto"
import { currentTimestamp } from "@/utils/general.util"

export default class RabbitMqClient {
    static conn: Connection
    static exchanges: Map<string, Exchange>

    /**
     * Connect rabbitmq
     */
    static connect(): void {
        if (!RabbitMqClient.conn) {
            RabbitMqClient.conn = new Connection(RabbitTopology.connection.uri)
        }

        RabbitMqClient.exchanges = new Map<string, Exchange>()

        RabbitTopology.exchanges.forEach(exchangeOptions => {
            const exchange = RabbitMqClient.conn.declareExchange(exchangeOptions.name, exchangeOptions.type, { durable: exchangeOptions.durable })

            RabbitMqClient.exchanges.set(exchangeOptions.name, exchange)
        })
    }

    /**
     * Dis connect rabbit
     */
    static async disconnect(): Promise<Bluebird<void>> {
        return RabbitMqClient.conn.close()
    }

    /**
     * Publish message
     *
     * @param {RabbitMessage} message
     */
    static publish(exchangeName: string, routingKey: string, message: unknown): void {
        const messageSend = new Message(JSON.stringify(message))

        const exchange = RabbitMqClient.exchanges.get(exchangeName)

        if (exchange) {
            exchange.send(messageSend, routingKey)
        }
    }

    /**
     * Publish message
     *
     * @param queueName
     * @param callback
     */
    static initConsumer(queueName: string): void {
        // declare a new exchange, it will be created if it does not already exist (async)
        const exchanges = subscriberConfig.exchanges as unknown[]

        exchanges.forEach(exchangeOptions => {
            const exOpt = exchangeOptions as Record<string, unknown>

            if (!RabbitMqClient.exchanges.get(<string>exOpt.name)) {
                const ex = RabbitMqClient.conn.declareExchange(<string>exOpt.name, <string>exOpt.type, { durable: <boolean>exOpt.durable })

                RabbitMqClient.exchanges.set(<string>exOpt.name, ex)
            }
        })

        const queue = RabbitMqClient.conn.declareQueue(queueName, subscriberConfig.queues)
        const bindings = subscriberConfig.bindings as unknown[]

        bindings.forEach(binding => {
            const b = binding as Record<string, unknown>

            if (b.target === queueName) {
                const exchange = RabbitMqClient.exchanges.get(<string>b.exchange)

                void queue.bind(exchange, <string>b.keys)
            }

        })
    }

    /**
     * Publish message
     *
     * @param queueName
     * @param callback
     */
    static consumer(queueName: string, callback: (message) => void): void {
        // declare a new exchange, it will be created if it does not already exist (async)
        const exchanges = subscriberConfig.exchanges as unknown[]

        exchanges.forEach(exchangeOptions => {
            const exOpt = exchangeOptions as Record<string, unknown>

            if (!RabbitMqClient.exchanges.get(<string>exOpt.name)) {
                const ex = RabbitMqClient.conn.declareExchange(<string>exOpt.name, <string>exOpt.type, { durable: <boolean>exOpt.durable })

                RabbitMqClient.exchanges.set(<string>exOpt.name, ex)
            }
        })

        const queue = RabbitMqClient.conn.declareQueue(queueName, subscriberConfig.queues)
        const bindings = subscriberConfig.bindings as unknown[]

        bindings.forEach(binding => {
            const b = binding as Record<string, unknown>

            if (b.target === queueName) {
                const exchange = RabbitMqClient.exchanges.get(<string>b.exchange)

                void queue.bind(exchange, <string>b.keys)
            }

        })

        void queue.activateConsumer(message => callback(message))
    }





    static async sendNotification(
        message?: NotifcationDto,
        exchange: string = Exchanges.NOTIFICATION,
        routingKey: string = RoutingKeys.NOTIFICATION_SEND
    ): Promise<void> {
        if (!message) return

        const noti = new MessageNotificationDto()

        noti.exchangeName = exchange
        noti.routingKey = routingKey
        noti.messageVersion = "v1.0"
        noti.issuer = "main_api"
        noti.issueAt = currentTimestamp()
        noti.message = message;

        void RabbitMqClient.publish(exchange, routingKey, noti)
    }

}
