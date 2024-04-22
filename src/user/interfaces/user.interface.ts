import {BaseInterface} from "../../cats/interfaces/base.interface";

export interface UserInterface extends BaseInterface {
    username: string;
    password: string;
    role: UserRolesEnum
}


export enum UserRolesEnum {
    User = 'User',
    Admin = 'Admin'
}