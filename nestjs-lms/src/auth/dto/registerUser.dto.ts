import { IsString, IsEmail } from "class-validator";
export class RegisterDto {
  @IsString()
  fName: string;
  @IsString()
  lName: string;
  @IsEmail()
  email: string;
  @IsString()
  pass: string;
}
