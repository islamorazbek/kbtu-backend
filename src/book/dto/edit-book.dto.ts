import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
import { Category } from "src/category/category.entity"

export class EditBookDto {
  @ApiProperty({ example: 1, required: true, description: "book id" })
  id: number

  @ApiProperty({ example: "Kniga 1", required: true, description: "book name" })
  name: string

  @ApiProperty({ example: "ADMIN", description: "book category" })
  @IsNotEmpty({ message: "required" })
  categoryId: number

  @ApiProperty({ example: "ADMIN", description: "book description" })
  @IsNotEmpty({ message: "required" })
  description: string

  @ApiProperty({ example: "$500", description: "book price" })
  @IsNotEmpty({ message: "required" })
  price: string
}