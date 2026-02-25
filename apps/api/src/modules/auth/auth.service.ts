import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.passwordHash) {
      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (isPasswordValid) {
        const { passwordHash, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Credenciais invalidas');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      businessId: user.businessId,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION') || '7d',
      }),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        businessId: user.businessId,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    return this.usersService.createWithBusiness(registerDto);
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      const user = await this.usersService.findOne(payload.sub);
      if (!user || !user.isActive) {
        throw new UnauthorizedException('Usuario nao encontrado ou inativo');
      }

      const newPayload = {
        sub: user.id,
        email: user.email,
        businessId: user.businessId,
        role: user.role,
      };

      return {
        access_token: this.jwtService.sign(newPayload),
        refresh_token: this.jwtService.sign(newPayload, {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION') || '7d',
        }),
      };
    } catch (error) {
      throw new UnauthorizedException('Token invalido ou expirado');
    }
  }

  async getProfile(userId: string) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('Usuario nao encontrado');
    }
    const { passwordHash, ...result } = user;
    return result;
  }

  async requestOtp(phone: string) {
    const normalizedPhone = phone.replace(/\D/g, '');

    const user = await this.prisma.user.findFirst({
      where: { phone: normalizedPhone },
    });

    if (!user) {
      throw new BadRequestException('Telefone nao cadastrado');
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await this.redis.set(`otp:${normalizedPhone}`, code, 300); // 5 min TTL

    // TODO: Integrar com WhatsApp para enviar o codigo
    console.log(`[DEV] OTP para ${normalizedPhone}: ${code}`);

    return { message: 'Codigo enviado com sucesso', phone: normalizedPhone };
  }

  async verifyOtp(phone: string, code: string) {
    const normalizedPhone = phone.replace(/\D/g, '');

    const storedCode = await this.redis.get(`otp:${normalizedPhone}`);

    if (!storedCode) {
      throw new BadRequestException('Codigo nao encontrado ou expirado. Solicite um novo.');
    }

    if (storedCode !== code) {
      throw new BadRequestException('Codigo invalido');
    }

    await this.redis.del(`otp:${normalizedPhone}`);

    // Buscar usuario
    const user = await this.prisma.user.findFirst({
      where: { phone: normalizedPhone },
      include: { business: true },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Usuario nao encontrado ou inativo');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      businessId: user.businessId,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION') || '7d',
      }),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        businessId: user.businessId,
        businessName: user.business?.name,
      },
    };
  }
}
