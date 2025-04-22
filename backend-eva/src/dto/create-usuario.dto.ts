/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty()
  usuario: string;

  @IsNotEmpty()
  nombres: string;

  @IsNotEmpty()
  apellidos: string;

  @IsNotEmpty()
  identificacion: string;

  @IsEmail()
  correo: string;

  @Length(6, 50)
  password: string;
  rolId?: number;
}
