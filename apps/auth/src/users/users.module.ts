import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { DatabaseModule } from '@app/common';
import { User, UserSchema } from './schema/user.schema';
import { UsersController } from './users.controller';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
