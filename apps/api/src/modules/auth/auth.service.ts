import { PrismaClient } from '@magwishlist/infrastructure/prisma';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface LoginResponse {
  access_token: string;
}

@Injectable()
export class AuthService {
  private prisma: PrismaClient;

  constructor(private jwtService: JwtService) {
    this.prisma = new PrismaClient();
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    Reflect.deleteProperty(user, 'password');

    return user;
  }

  login(user: Omit<User, 'password'>): LoginResponse {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
