export const SERVICE_NAME_APP = "zeta_service"

export const VIEW_ABLE_USER_ATTRIBUTES = [
    "id", "full_name", "display_name", "cover", "avatar", "avatar_thumb_pattern", "cover_thumb_pattern"
]

export const CacheUserInfoTime = 1800 // second
export const CacheRelationTime = 1800 // second
export const CachePageTime = 1800 // second
export const appCacheNames = {
    VIDEO_TRANCODE_RESULT: "Video_trancode_result:",
    VIDEO_TRANCODE_RESULT1: "Video_trancode_result:"
}

export const ApiService = {
    CHANGE_STATUS_JOBPOST: "/jobs/change-status/%s",
}

export const OBJECT_TYPE_ALBUM = 7n // https://docs.contentcms.online/service.global_id.html
export const START_TIME_CUSTOM_ID = 1420070400000n // https://docs.contentcms.online/service.global_id.html
export const MAX_VAR = 262143 // https://docs.contentcms.online/service.global_id.html



export const DefaultSetting = {
    // not need setting
    DEFAULT_CACHE_SETTING: 3600,
    CONTACT_ER_SERVICE_ID: 40,//
    SEARCH_CDD_SERVICE_ID: 33,
    // setting
    SUITABLE_THRESHOLD: 3600,//%
    DEFAULT_SEARCH_DISTANCE: 5000,//m
    MAX_OVERTIME_EXPIRED: 23,
    MAPPING_WORKING_TIME_PERCENT: 70,
    DEFAULT_TIMEOUT_FOR_CALL_CONTACT: 24 * 60 * 60,//24 hour, can recall without cost within 24 hours
    REFERER_LIMIT: 30,
    SUPPORTING_PROVINCE_IDS: [1, 49, 79],//Hanoi, Da Nang, HCM
    LIMIT_CREATE_GROUP: 20,//Limit create group equal to 20

    USER_MATCHING_DISTANCE_INCREATE_EVERY_LOOP: 2000, // metter
    USER_MATCHING_TIME_FOR_EVERY_LOOP: 10, // MINUTES
    USER_MATCHING_TIMES_LOOP: 3, // TIMES

    MAX_ADDR_MATCH: 1000,
    MAX_CATS_MATCH: 3000,// This is the most important factor
    MAX_WAGE_MATCH: 2500,
    MAX_EXP_MATCH: 2500,
    MAX_AGE_MATCH: 1000,
    MAX_SCHEDULE_MATCH: 1000,
    MAX_EDU_MATCH: 1000,
    DISTANCE_MATCH: 3000,//3 km

}

export const SettingNames = {
    MAX_OVERTIME_EXPIRED: "MAX_OVERTIME_EXPIRED",
    MAPPING_WORKING_TIME_PERCENT: "MAPPING_WORKING_TIME_PERCENT",
    SUITABLE_THRESHOLD: "SUITABLE_THRESHOLD",
    DEFAULT_SEARCH_DISTANCE: "DEFAULT_SEARCH_DISTANCE",
    CONTACT_ER_SERVICE_ID: "CONTACT_ER_SERVICE_ID",
    SEARCH_CDD_SERVICE_ID: "SEARCH_CDD_SERVICE_ID",
    LIMIT_CREATE_GROUP: "LIMIT_CREATE_GROUP",

    ONE_PAY_SETTING: "ONE_PAY_SETTING",

    // matching user
    USER_MATCHING_DISTANCE_INCREATE_EVERY_LOOP: "USER_MATCHING_DISTANCE_INCREATE_EVERY_LOOP", // metter
    USER_MATCHING_TIME_FOR_EVERY_LOOP: "USER_MATCHING_DISTANCE_INCREATE_EVERY_LOOP", // MINUTES
    USER_MATCHING_TIMES_LOOP: "USER_MATCHING_DISTANCE_INCREATE_EVERY_LOOP", // TIMES

    MAX_ADDR_MATCH: "MAX_ADDR_MATCH",
    MAX_CATS_MATCH: "MAX_CATS_MATCH",
    MAX_WAGE_MATCH: "MAX_WAGE_MATCH",
    MAX_EXP_MATCH: "MAX_EXP_MATCH",
    MAX_SCHEDULE_MATCH: "MAX_SCHEDULE_MATCH",
    MAX_AGE_MATCH: "MAX_AGE_MATCH",
    MAX_EDU_MATCH: "MAX_EDU_MATCH",
    DISTANCE_MATCH: "DISTANCE_MATCH",
}

export const DeepLinkings = {
    JOB_DETAIL: "base_worker://JobDetail/:id",
    CANDIDATE_PROFILE: "base_worker://ProfileCandidateScreen/:id",
    RECOMMEND_FRIEND_SCREEN: "base_worker://RecommendFriendScreen/:id",
    USER_PROFILE: "base_worker://UserProfile",
    INBOX: "base_worker://Inbox/:id",
    NOTIFICATION: "base_worker://Notification/:id",
    POST_DETAIL: "base_worker://PostDetailScreen/:id",
    PAYMENT_DETAIL: "base_worker://orderHistory",
    BUY_DIAMONS: "base_worker://InAppPurchaseScreen",
}

export const NotificationCategories = {
    "BASE_WORKER": "BASE_WORKER",
    "NEW_JOB": "NEW_JOB",
    "APPLIED_JOB": "APPLIED_JOB",
    "ACCEPTED_JOB": "ACCEPTED_JOB",
}

export const TimeNotiRemainRegisterAccount = {
    "3Days": 3 * 24 * 60 * 60,
    "7Days": 7 * 24 * 60 * 60
}

export const TimeConstants = {
    OneMinute: 60,//seconds
    OneHour: 3600,//60 * 60,
    OneDay: 86400,//24 * 60 * 60,
    OneWeek: 7 * 86400,//7 * 24 * 60 * 60,
    OneMonth: 30 * 86400,//30 * 24 * 60 * 60,
    OneYear: 365 * 86400,//365 * 24 * 60 * 60,
}