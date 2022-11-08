import { User } from "src/user/user.entity";
import {Request} from "express";

export interface MyRequestInterface extends Request{
  user?:User
}