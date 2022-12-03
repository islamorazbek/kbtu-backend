import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class CreateBookDto {
  @ApiProperty({ example: "Kniga 1", required: true, description: "book name" })
  name: string

  @ApiProperty({ example: "ADMIN", description: "book category", required: true })
  categoryId: number

  @ApiProperty({ example: "ADMIN", description: "book description", required: true })
  @IsNotEmpty({ message: "required" })
  description: string

  @ApiProperty({ example: "$500", description: "book price", required: true })
  @IsNotEmpty({ message: "required" })
  price: string
}
