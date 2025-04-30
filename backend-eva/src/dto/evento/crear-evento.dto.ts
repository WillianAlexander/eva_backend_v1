import { IsDate, IsNotEmpty } from 'class-validator';

export class CrearEventoDto {
  @IsNotEmpty()
  titulo: string;

  @IsNotEmpty()
  @IsDate()
  fevento: Date;

  @IsNotEmpty()
  observacion: string;

  @IsNotEmpty()
  estado: string;
}
