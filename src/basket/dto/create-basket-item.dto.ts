import {ApiProperty} from "@nestjs/swagger";

export class CreateBasketItemDto {
    @ApiProperty({example:1,description:"id продукта"})
    readonly bookId: number
    @ApiProperty({example:5,description:"количество продукта продукта"})
    readonly qty?: number
}