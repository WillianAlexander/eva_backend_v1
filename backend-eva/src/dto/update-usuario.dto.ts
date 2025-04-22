/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, Length } from 'class-validator';

export class UpdateUsuarioDto {
  nombres?: string;

  apellidos?: string;

  @IsEmail()
  correo?: string;

  @Length(6, 50)
  password?: string;

  rolId?: number;
}
