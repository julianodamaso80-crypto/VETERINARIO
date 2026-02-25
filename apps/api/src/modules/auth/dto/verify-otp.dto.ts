import { IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpDto {
  @ApiProperty({ example: '(11) 99999-9999' })
  @IsString()
  @Matches(/^[\d\s().+-]+$/, { message: 'Formato de telefone invalido' })
  phone: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @Length(6, 6, { message: 'Codigo deve ter 6 digitos' })
  otp: string;
}
