import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class CreateShopDto {
  @ApiProperty({ example: "Shop 1", required: true, description: "shop name" })
  @IsNotEmpty()
  name: string

  @ApiProperty({ example: "Almaty", description: "shop city", required: true })
  @IsNotEmpty()
  city: string
}
