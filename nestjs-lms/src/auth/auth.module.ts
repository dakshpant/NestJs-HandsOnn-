import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config/dist/config.module";
// import { jwtConstants } from "./constants";

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      // isGlobal: true,
    }), 
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SUPER_SECRET_KEY,
      signOptions: { expiresIn: "1hrs" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
