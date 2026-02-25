import { IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestOtpDto {
  @ApiProperty({ example: '(11) 99999-9999', description: 'Telefone com DDD' })
  @IsString()
  @Matches(/^[\d\s().+-]+$/, { message: 'Formato de telefone invalido' })
  phone: string;
}
