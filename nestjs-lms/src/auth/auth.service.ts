/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { RegisterDto } from "./dto/registerUser.dto";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcrypt";
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async registerUser(registerUserDto: RegisterDto) {
    console.log("registerDto", registerUserDto);

    const saltRounds: number = 10;
    const hash = await bcrypt.hash(registerUserDto.pass, saltRounds);

    /**
     * TODO: Implement user registration logic here
     * 1.Check IF User already exists
     * 2.hash the password => done
     * 3.store user into db => done
     * 4. generate jwt token
     * 5. send token in to response
     */
    const user = await this.userService.createUser({
      ...registerUserDto,
      pass: hash,
    });
    const payload = { sub: user._id };
    const token = await this.jwtService.signAsync(payload);
    console.log(token);

    return { accessToken: token };
  }
}
