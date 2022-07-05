import { BaseEntity } from "#/entites/base.entity"
import Bull, {
  DoneCallback,
  Job,
} from "bull"

import { TEST_JOB as JOB_NAME } from "@/configs/jobs"
import { User } from "@sentry/node"

import SentryComponent from "../components/sentry"
import { RETRY_CALL_POST_SERVICE } from "../configs/config"
import Worker from "./index"

// import User from "@/entities/user.entity"

class JobData extends BaseEntity {
    job: string
    retry: 0
    body: User

    /**
     * User Constructor
     *
     * @param {any} params
     */
    constructor(params?: Record<string, unknown>) {
        super()
        if (params) {
            this.setAttributes(params)
        }
    }
}

const handler = async (job: Job<JobData>, done: DoneCallback) => {
    // console.log(job);

    try {
        if (job.data.retry <= RETRY_CALL_POST_SERVICE) {
            console.log("Debug ok ", job.data, RETRY_CALL_POST_SERVICE)
            const queue = await Worker.getQueue(JOB_NAME)
            job.data.retry++
            const jobData = job.data
            await queue.add(jobData, { delay: 15000 })
        } else {
            // SentryComponent.captureException(new Error("Max try call post api"), job.data)
            console.log("Debug no", job.data, RETRY_CALL_POST_SERVICE)
        }

        return done()

    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        SentryComponent.captureException(error, job.data)

        return done(error)
    }
}

export default async function registerJob(): Promise<Bull.Queue> {
    console.info("Listen to job: ", JOB_NAME)

    const queue = await Worker.getQueue(JOB_NAME)

    const timeDelayToCleanJob = 10000
    const jobStatus = "delayed"

    await queue.clean(timeDelayToCleanJob, jobStatus)
    // const jobContent = new JobData(
    //     {
    //         job: JOB_NAME,
    //         retry: 0,
    //         body: { userId: 8 }
    //     }
    // )
    // await queue.add(jobContent)
    // console.log(jobContent)
    void queue.process(handler)

    return queue
}