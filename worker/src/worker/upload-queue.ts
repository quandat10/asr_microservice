import Bull, {
  DoneCallback,
  Job,
} from "bull"

import { UPLOAD_ASR as JOB_NAME } from "@/configs/jobs"
import { UploadAsrDto } from "@/dtos/upload-asr.dto"

import Worker from "./index"

const handler = async (job: Job, done: DoneCallback) => {
    // console.log("Debug", JOB_NAME)

    try {
        const data: UploadAsrDto = job.data as UploadAsrDto
        console.log(data)
        console.log((data.data.data as unknown as []).length)
        
        return done()
    } catch (error) {
        return done(error)
    }
}

export default async function registerJob(): Promise<Bull.Queue> {
    console.info("Listen to job: ", JOB_NAME)
    const queue = await Worker.getQueue(JOB_NAME)
    const timeDelayToCleanJob = 10000
    const jobStatus = "delayed"

    await queue.clean(timeDelayToCleanJob, jobStatus)
    // console.log(jobContent)
    void queue.process(handler)

    return queue
}
