import { ApiProperty } from "@nestjs/swagger";

export class AddItemToBasketDto{
  @ApiProperty({example: 12, description: 'book id to add to basket'})
  bookId: number
}