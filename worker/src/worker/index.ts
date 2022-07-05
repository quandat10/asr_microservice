import Bull, {
  Queue,
  QueueOptions,
} from "bull"

import DbRedis from "@/components/db.redis"
import { container } from "@/components/di.container"
import TYPES from "@/services/types"

import TestQueue from "./test_queue"
import UploadAsrQueue from "./upload-queue"

const redis: DbRedis = container.get(TYPES.dbRedis)

export default class Worker {
    static queues: Bull.Queue[] = []

    static async start(): Promise<void> {
        Worker.queues.push(
            await TestQueue(),
            await UploadAsrQueue()
        );
    }

    static async stop(): Promise<unknown[]> {
        const promises = Worker.queues.map(queue => queue.close().catch(() => { }))
        return Promise.all(promises)
    }

    static async getQueue(jobName: string): Promise<Queue> {

        const options = await redis.getJobOptions() as QueueOptions
        const queue = new Bull(jobName, options)

        queue.on("failed", (job, error) => {
            console.log("init getQueue false", error);
            // sentry.captureException({ error, data: job });
        })

        queue.on("error", error => {
            console.log("getQueue error", error);
            // sentry.captureException({ error, data: { jobName } });
        })

        return queue
    }
}
