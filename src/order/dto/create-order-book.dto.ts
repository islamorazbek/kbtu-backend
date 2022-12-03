import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderBookDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ example: "1", description: "количество товара" })
    qty: number;
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ example: "1", description: "идентификатов товара" })
    productId: number;
}