import { MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './guards/strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt/';
import { JwtStrategy } from './guards/strategies/jwt.strategy';
import { LoginValidationMiddleware } from './middlewares/login-validation.middlewares';


@Module({
  imports: [UserModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '30d' },
  })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],

})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
  }
}
