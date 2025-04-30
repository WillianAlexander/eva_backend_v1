import { IsDate, IsNumber, IsString } from 'class-validator';
import { Eventos } from 'src/entities/eventos.entity';
import { Usuarios } from 'src/entities/usuarios.entity';

export class RegistrarEvaluacionDto {
  @IsDate()
  fevaluacion: Date;

  @IsNumber()
  evento_id: Eventos;

  @IsString()
  evaluador_id: Usuarios;

  @IsNumber()
  evaluado_id: number | undefined;

  @IsNumber()
  criterio1?: number | undefined;

  @IsNumber()
  criterio2?: number | undefined;

  @IsNumber()
  criterio3?: number | undefined;

  @IsNumber()
  criterio4?: number | undefined;

  @IsNumber()
  criterio5?: number | undefined;

  @IsNumber()
  criterio6?: number | undefined;

  @IsNumber()
  criterio7?: number | undefined;

  @IsNumber()
  criterio8?: number | undefined;

  @IsNumber()
  criterio9?: number | undefined;

  @IsNumber()
  criterio10?: number | undefined;

  @IsString()
  comentario: string;
}
