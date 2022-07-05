export enum Env {
    Dev = "development",
    Staging = "staging",
    Production = "production"
}

export enum NewsStatus {
    //1: in review, 2: published, 4: expire, 8: deleted
    InReview = 1,
    Published = 2,
    Expired = 4,
    Deleted = 8,
}

export enum RewardSource {
    //1: system reward, 2: vip, 4: login, 8: signup/verify ',
    System = 1,
    VIP = 2,
    Login = 4,
    SignupOrVerify = 8,
    BoughtDiamonds = 16,
}

export enum ContactType {
    Call = 1,
    eMail = 2,
    Message = 4,
}

export enum MessageType {
    //1: in review, 2: published, 4: expire, 8: deleted
    ToAll = 0,
    ToIndividual = 1,
}

export enum MessageStatus {
    //1: in review, 2: published, 4: expire, 8: deleted
    UnRead = 0,
    Read = 1,
    Deleted = 2,
}

export enum RedeemType {
    UserCode = 0,
    SaleRefCode = 1,
    Others = 2,
}

export enum RateType {
    //1: employee rating, 2: employer rating, 4: company rating
    EmployeeRate = 1,
    EmployerRate = 2,
    CompanyRate = 4,
}


export enum AddressTool {
    BusRoute = "route",
    Geo2Addr = "geo2add",
    Addr2Geo = "add2geo",
}