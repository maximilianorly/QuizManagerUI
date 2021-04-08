import UserAccessEnum from "../enums/UserAccessEnum";

export default interface IUser {
    id?: number;
    firstName?: string;
    lastName?: string;
    username?: string;
    password?: string;
}

export interface IUserAccess extends IUser {
    accessLevel?: UserAccessEnum;
}