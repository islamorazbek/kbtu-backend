import { ApiProperty } from "@nestjs/swagger";

export class AuthResponseDto {
  @ApiProperty({ example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTY2NzkzMzMwNCwiZXhwIjoxNjY3OTQ0MTA0fQ.N2TX9BO4CwOctMl9IWWAu47FsXUVnxkNxf7ZDALwDWQ" })
  access_token: string;
}