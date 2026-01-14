import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { RegisterDto } from "src/auth/dto/registerUser.dto";
import { User } from "./schemas/user.schema";
import { Model } from "mongoose";
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(registerUserDto: RegisterDto) {
    try {
      return await this.userModel.create({
        fName: registerUserDto.fName,
        lName: registerUserDto.lName,
        email: registerUserDto.email,
        pass: registerUserDto.pass,
      });
    } catch (error) {
      console.log(error);
      const e = error as { code?: number };
      const DUPLICATE_KEY_CODE = 11000;

      if (e.code === DUPLICATE_KEY_CODE) {
        throw new ConflictException(
          `User with ${registerUserDto.email} already exists`,
        );
      }
      throw error;
    }
  }

  async getUserById(id: string) {
    return await this.userModel.find({ _id: id });
  }
}
