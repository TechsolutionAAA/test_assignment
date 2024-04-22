import {IsInt, IsNumber, IsOptional} from "class-validator";

export class UpdateCatDto {
    @IsInt()
    id: number;

    @IsOptional()
    name: string;

    @IsNumber()
    @IsOptional()
    age: number;

    @IsOptional()
    breed: string;
}