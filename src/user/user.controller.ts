import {
    Controller, Get, UseGuards
} from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../auth/guards/auth.guard";
// import { UserDecorator } from "./decorator/User.decorator";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@ApiTags("Пользователь")
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {
    }

    @UseGuards(AuthGuard)
    @Get()
    getUser(): Promise<User[]> {
        return this.userService.getUsers()
    }

    // @ApiOperation({summary:"загрузить пользователя через его токен",})
    // @ApiResponse({status:200,type:User})
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard)
    // @Get("me")
    // userMe(@UserDecorator()user: User) {
    //     return user
    // }

    // @ApiOperation({summary: "изменить пороль",})
    // @ApiResponse({status: 201})
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard)
    // @Put('password')
    // updatePassword(@Body()dto:UpdateUserPasswordDto,@UserDecorator('id')userId:number){
    //    return this.userService.updateUserPassword(dto,userId)
    // }
}
