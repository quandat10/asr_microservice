import { configuration } from 'config/app.config';
import {
  KafkaStreams,
  KafkaStreamsConfig,
} from 'kafka-streams';
import {
  Consumer,
  ConsumerSubscribeTopic,
  Kafka,
} from 'kafkajs';
import { PythonShell } from 'python-shell';

import {
  Injectable,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const config: KafkaStreamsConfig = {
  kafkaHost: configuration.streams.kafkaHost,
  groupId: configuration.streams.groupId,
  clientName: configuration.streams.clientName,
  workerPerPartition: configuration.streams.workerPerPartition,
  options: {
    sessionTimeout: configuration.streams.options.sessionTimeout,
    protocol: [configuration.streams.options.protocol],
    fromOffset: configuration.streams.options.fromOffset, //earliest, latest
    fetchMaxBytes: configuration.streams.options.fetchMaxBytes,
    fetchMinBytes: configuration.streams.options.fetchMinBytes,
    fetchMaxWaitMs: configuration.streams.options.fetchMaxWaitMs,
    heartbeatInterval: configuration.streams.options.heartbeatInterval,
    retryMinTimeout: configuration.streams.options.retryMinTimeout,
    requireAcks: configuration.streams.options.requireAcks,
    ackTimeoutMs: configuration.streams.options.ackTimeoutMs,
    //partitionerType: configuration.streams.options.partitionerType
  }
}

@Injectable()
export class ConsumerService implements OnApplicationShutdown {

  constructor(
    private readonly configService: ConfigService,
  ) { }

  private readonly kafka = new Kafka({
    brokers: [this.configService.get("KAFKA_BROKER")],
  });

  private readonly kafkaStreams = new KafkaStreams(config);
  private readonly consumers: Consumer[] = [];

  async consume(topic: ConsumerSubscribeTopic) {
    const consumer = this.kafka.consumer({ groupId: this.configService.get("TOPIC") });
    await consumer.connect();
    await consumer.subscribe(topic);
    await consumer.run(
      {
        eachMessage: async ({ topic, partition, message }) => {

          consumer.pause([{ topic }])
          setTimeout(() => {
            consumer.resume([{ topic }])
            console.log("Hello")
            PythonShell.run('src/train.py', {
              args: [message.value.toString()]
            }, function (err, results) {
              if (err)
                throw err;
              console.log(results);
            });
          }, 5000)

          //   console.log(message.value.toString())
          // setTimeout(()=>{
          //     console.log({
          //         value: message.value.toString(),
          //         topic: topic.toString(),
          //         partition: partition.toString(),
          //     });
          //     console.log("delay 5s")},5000)
        },
      },
    );
    this.consumers.push(consumer);

  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }

  async kafkaStreamsConsumer() {

    const stream = this.kafkaStreams.getKStream(this.configService.get("TOPIC"));
    console.log(stream.countByKey);
    // stream.forEach((message)=>{
    //   console.log("==========================")
    //   console.log("key", message.key ? message.key.toString("utf8") : null);
    //   console.log("value", message.value ? message.value.toString("utf8") : null);
    //   console.log("partition", message.partition);
    //   console.log("size", message.size);
    //   console.log("offset", message.offset);
    //   console.log("timestamp", message.timestamp);
    //   console.log("topic", message.topic);
    // })
    stream.start().then(() => {
      //wait a few ms and close all connections
      setTimeout(this.kafkaStreams.closeAll.bind(this.kafkaStreams), 5000);
    });
  }
}
