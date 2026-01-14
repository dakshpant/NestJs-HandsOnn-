/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/registerUser.dto";
import { AuthGuard } from "./auth.guard";
import { UserService } from "src/user/user.service";

@Controller("auth") //Prefix for all routs in the controller
export class AuthController {
  // authService: AuthService;//after adding private readonly in constructor we dont need this line
  // constructor(authService: AuthService) {
  // this.authService = authService; //No need to do this after adding private readonly
  // }

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post("register") // /auth/register
  async register(@Body() registerUserDto: RegisterDto) {
    const token = await this.authService.registerUser(registerUserDto);
    return token;
  }

  @Post("login")
  async login() {
    /*
    Receive email and pass
    validate user{match email and pass}=> bcrypt compare for pass
    if valid generate jwt token and return 
    else throw Unauthorized exception 
    */
    return "login route";
  }

  @UseGuards(AuthGuard)
  @Get("profile")
  async getProfile(@Request() req) {
    const userId = req.user.sub;

    const user = await this.userService.getUserById(userId);
    console.log(user);

    // return user;will return everything including pass which we dont want
    // Or we can customize the user schema to not return pass but for now we will do this
    return {
      fName: user[0].fName,
      lName: user[0].lName,
      email: user[0].email,
    };
  }
}
