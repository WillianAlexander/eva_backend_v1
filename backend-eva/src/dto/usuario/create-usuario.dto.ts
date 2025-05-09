import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

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

  @IsOptional()
  @IsNumber()
  departamento_id?: number;
}
