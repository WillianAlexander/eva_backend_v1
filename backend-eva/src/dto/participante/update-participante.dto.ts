/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail } from 'class-validator';

export class CrearParticipanteDto {
  nombre?: string;

  apellido?: string;

  @IsEmail()
  correo?: string;

  departamento_id?: number;
}
