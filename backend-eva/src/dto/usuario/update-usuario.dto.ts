/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, Length } from 'class-validator';

export class UpdateUsuarioDto {
  nombres?: string;

  apellidos?: string;

  @IsEmail()
  correo?: string;

  rolId?: number;
}
