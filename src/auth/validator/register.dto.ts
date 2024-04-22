import {IsEmail, IsString} from "class-validator";

export class RegisterDto {
    @IsString()
    @IsEmail()
    username: string;

    @IsString()
    password:string

}