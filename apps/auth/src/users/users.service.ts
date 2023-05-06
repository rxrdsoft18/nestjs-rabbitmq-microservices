import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import * as bcrypt from "bcrypt";
import { UsersRepository } from "./users.repository";
import { GetUserDto } from "./dtos/get-user.dto";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async createUser(createUserDto: CreateUserDto) {
    const existsUser = await this.validateExistsUser(createUserDto.email);

    if (existsUser) {
      throw new ConflictException('Exists user with email');
    }

    const hashedPassword = await this.hashPassword(createUserDto.password);
    return this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  private async validateExistsUser(email: string) {
    return this.usersRepository.findOne({
      email,
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return user;
  }

  async getUser(getUser: GetUserDto) {
    return this.usersRepository.findOne(getUser);
  }
}
