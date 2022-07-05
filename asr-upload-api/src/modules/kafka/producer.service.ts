import {
  KafkaStreams,
  KafkaStreamsConfig,
} from "kafka-streams";
import {
  Kafka,
  Producer,
  ProducerRecord,
} from "kafkajs";

import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { configuration } from "../../configs/app.config";

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
    partitionerType: configuration.streams.options.partitionerType
  },

}

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {


  constructor(
    private readonly configService: ConfigService,
  ) { }

  private readonly kafka = new Kafka({
    brokers: [this.configService.get("KAFKA_BROKER")],
  });

  private readonly kafkaStreams = new KafkaStreams(config);


  private readonly producer: Producer = this.kafka.producer();

  async onModuleInit() {
    await this.producer.connect();
  }

  async produce(record: ProducerRecord) {
    await this.producer.send(record);
  }

  async onApplicationShutdown() {
    await this.producer.disconnect();
  }

  async kafkaStreamsProduce(dataStreams: Buffer) {
    const data = this.kafkaStreams.getKStream(null)

    data.to(this.configService.get("TOPIC"))
    // while (dataStreams.length > 0) {
    //   setTimeout(()=>arrayStreams.push(dataStreams.slice(0, 30000)),3000)
    // }
    // let i = 0
    const size = 30000
    data.start().then(
      () => {
        const length = parseInt((dataStreams.length/(size)).toString(),10)
        // console.log("length array",length)
        // data.writeToStream(dataStreams)
        for (let i = 0; i <=length; i++) {
          if(size*(i+1) >dataStreams.length ){
            // console.log("hereee")
            // data.writeToStream(dataStreams.slice(i*size, dataStreams.length-1))
            data.writeToStream(Buffer.concat([dataStreams.subarray(0,1000),dataStreams.slice(i*size, dataStreams.length-1)]))

          }else{
            data.writeToStream(Buffer.concat([dataStreams.subarray(0,1000),dataStreams.slice(i*size, size*(i+1))]))
          }
          // console.log(dataStreams.subarray(0,50000))
          // const newss = Buffer.from(dataStreams.subarray(0,999))
          // const news2 = Buffer.concat([dataStreams.subarray(0,1000),dataStreams.subarray(50000,100000)])
          // data.writeToStream(news2)
          // console.log(dataStreams.slice(0, size).join(','))
        }
      }
    )



    // arrayStreams.map(item=>{
    //   console.log(item)
    //   // data.start().then(() => {
    //   //   data.writeToStream(item)
    //   // })
    // })


    setTimeout(this.kafkaStreams.closeAll.bind(this.kafkaStreams), 5000);
  }
}
