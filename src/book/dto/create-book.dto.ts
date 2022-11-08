import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class CreateBookDto {
  @ApiProperty({ example: "Kniga 1", required: true, description: "book name" })
  name: string

  @ApiProperty({ example: "ADMIN", description: "book category" })
  @IsNotEmpty({ message: "required" })
  category: string

  @ApiProperty({ example: "ADMIN", description: "book description" })
  @IsNotEmpty({ message: "required" })
  description: string

  @ApiProperty({ example: "$500", description: "book price" })
  @IsNotEmpty({ message: "required" })
  price: string
}