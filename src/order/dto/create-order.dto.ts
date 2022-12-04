import {ApiProperty} from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsOptional} from "class-validator";


export class CreateOrderDto {
    @IsNotEmpty()
    @ApiProperty({example:"Алматы",description:"Город"})
    city:string;
    @IsNotEmpty()
    @ApiProperty({example:"42",description:"офис или квартира"})
    apartment:string;
    @IsNotEmpty()
    @ApiProperty({example:"Жанаталап",description:"ройон или местность"})
    building:string;
    @IsNotEmpty()
    @ApiProperty({example:"Койбагар",description:"Улица"})
    street:string;
    @IsNotEmpty()
    @ApiProperty({example:"87075545401",description:"телефон номер заказщика"})
    phone:string
}