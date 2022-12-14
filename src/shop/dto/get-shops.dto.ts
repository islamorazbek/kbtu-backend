import { ApiProperty } from "@nestjs/swagger"

export class GetShopsDto {
  @ApiProperty({ example: "Shop 1", required: false, description: "shop name" })
  name?: string
}
