import { Injectable } from '@nestjs/common';
import { CreateEventoParticipante } from 'src/dto/evento_participante/create-eventoparticipante.dto';
import { EventoParticipantes } from 'src/entities/eventoparticipantes.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class EventoparticipantesService {
  constructor(private datasource: DataSource) {}

  findByEvent(id: number) {
    return this.datasource.manager.find(EventoParticipantes, {
      where: { evento_id: id },
      relations: ['departamento', 'evento'],
    });
  }

  registerEventParticipant(dto: CreateEventoParticipante) {
    return this.datasource.transaction(async (manager) => {
      const eventParticipant = manager.create(EventoParticipantes, { ...dto });

      return manager.save(eventParticipant);
    });
  }
}
