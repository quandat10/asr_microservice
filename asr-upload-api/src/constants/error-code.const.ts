export const ErrorCodes = {

    // General Error
    UNKNOWN: 9000,
    SYSTEM_GENERAL_ERROR: 9001,
    DATABASE_ERROR: 9002,
    INVALID_HEADERS: 9003,

    // Database
    DATABASE_CONNECTION_ERROR: 9100,
    INSERT_ERROR: 9101,
    UPDATE_ERROR: 9102,
    DELETE_ERROR: 9103,



    //Pagination
    PAGE_OUT_OF_RANGE: 1010,

    // User
    USER_NOT_PERMIT: 2002,
    USER_NOT_EXIST: 2003,
    USER_CODE_ALREADY_EXISTS: 2004,
    USER_PHONE_NUMBER_ALREADY_EXISTS: 2005,

    // Validate
    VALIDATION_INPUT_TYPE_ERROR: 1004,
    INVALID_USER_CODE: 1005,
    INVALID_PHONE_NUMBER: 1006,
    NOT_IMAGE: 1007,

    // Crud Job post 5XXX, 6XXX
    JOB_INSERT_DATA_FAILED: 5000,
    jOB_UPDATE_DATA_FAILED: 5001,
    jOB_DELETE_DATA_FAILED: 5002,

    //Cloud Storage
    FILE_NOT_EXIST: 6000,
    FILE_DELETE_FAILED: 6001,
    UPLOAD_LIMIT_EXCEED: 6002,
}
