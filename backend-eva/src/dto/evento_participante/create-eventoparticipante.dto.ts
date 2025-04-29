import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEventoParticipante {
  @IsNotEmpty()
  @IsNumber()
  evento_id: number;

  @IsNotEmpty()
  @IsNumber()
  participante_id: number;
}
