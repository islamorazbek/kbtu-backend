import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user.service";
import { MyRequestInterface } from "utils/interfaces/request-interface";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService, private userService: UserService) { }
    
    async use(req: MyRequestInterface, res: Response, next: NextFunction): Promise<any> {
        if (!req.headers.authorization) {
            req.user = null;
            next()
            return
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            const decode = this.jwtService.verify(token)
            req.user = await this.userService.findById(Number(decode.id))
            next()
        } catch (e) {
            req.user = null;
            next()
        }
    }
}