export const SERVICE_NAME_APP = "base_worker.dispatcher"

export const Exchanges = {
    NOTIFICATION: "Notification",
    POST_JOB: "PostJob",
}

export const RoutingKeys = {
    NOTIFICATION_SEND: "send",
    CREATED: "created",
    UPDATED: "updated",
    DELETED: "deleted",
    CHANGE_STATUS: "change_status",
}

export const SubTopics = {
    PUBLIC_USER_TOPIC: "base_worker/public/+/+"
}

export const RabbitMqQueues = {
    LISTEN_POST_JOB_EVENT: `${SERVICE_NAME_APP}.listen.postjob.event`,
}

export const Jobs = {
    JOB_LISTEN_POST_JOB_EVENT: "job_listen_post_create"
}


export const PubTopics = {
    USER_MESSAGES: "base_worker/public/%userId%/messages",
    USER_UGENT_JOB: "base_worker/public/%userId%/ugent_jobs",
    USER_UGENT_INAPP_NOTIFICATION: "base_worker/public/%userId%/inapp_notification",
    SEND_ALL_INAPP_NOTIFICATION: "base_worker/public/send_all_inapp_notification",
}