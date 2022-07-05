/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { connectAsync } from "async-mqtt"
import {
  connect,
  IClientOptions,
  MqttClient,
} from "mqtt"

import Config from "@/configs/config"

export default class Mqtt {
    static client: MqttClient
    static caFile: string

    static getOptions(): IClientOptions {
        // const fs = require("fs")
        // const TRUSTED_CA_LIST: string = cleanCrt(fs.readFileSync(Config.MQTT_CERT, "utf8"))

        const mqttOptions: IClientOptions = {
            keepalive: 60,
            reschedulePings: true,
            protocolId: "MQTT",
            protocolVersion: 5,
            reconnectPeriod: 1000,
            connectTimeout: 10 * 1000,
            clean: true,
            protocol: "wss",
            username: Config.MQTT_USER,
            password: Config.MQTT_PASSWORD,
            // ca: TRUSTED_CA_LIST,
            rejectUnauthorized: true
        }

        // console.log("Debug", mqttOptions);

        return mqttOptions
    }
    /**
     * Connect rabbitmq
     */
    static connect(): MqttClient {
        if (!Mqtt.client) {
            Mqtt.client = connect(Config.MQTT_URI, Mqtt.getOptions())

            Mqtt.client.on("error", function (err) {
                console.log(err)
                Mqtt.client.end()
            })

            Mqtt.client.on("connect", function () {
                console.log("Mqtt connected")
            })

            Mqtt.client.on("close", function () {
                console.log("Mqtt close")
                Mqtt.connect()
            })

        }

        return Mqtt.client
    }

    /**
     * @returns Promise
     */
    static async asyncConnect(): Promise<MqttClient> {
        if (!Mqtt.client) {
            Mqtt.client = await connectAsync(Config.MQTT_URI, Mqtt.getOptions())

            Mqtt.client.on("error", function (err) {
                console.log(err)
                Mqtt.client.end()
            })

            Mqtt.client.on("connect", function () {
                console.log("Mqtt connected")
            })

            Mqtt.client.on("close", function () {
                console.log("Mqtt close")
                Mqtt.connect()
            })
        }

        return Mqtt.client
    }

    // return new Promise((resolve, reject) => {
    //     request(options, (error, response, body) => resolve({ error, response, body }));
    //   });

    /**
     * Dis connect rabbit
     */
    static async disconnect(): Promise<MqttClient> {
        return Mqtt.client.end()
    }

    /**
     * Publish message
     *
     * @param {RabbitMessage} message
     */
    static publish(topic: string, content: Record<string, unknown>): MqttClient {
        return Mqtt.client.publish(topic, JSON.stringify(content))
    }
}
