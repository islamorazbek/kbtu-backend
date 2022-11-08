import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserPasswordDto {
    @ApiProperty({example:"123456",description:"страрый пороль"})
    readonly oldPassword:string;
    @ApiProperty({example:"123456",description:"новый пороль"})
    readonly newPassword:string;
}