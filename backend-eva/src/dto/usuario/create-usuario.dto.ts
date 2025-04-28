/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsNotEmpty, IsNumber, Length } from 'class-validator';

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

  @IsNumber()
  departamento_id: number;
}
