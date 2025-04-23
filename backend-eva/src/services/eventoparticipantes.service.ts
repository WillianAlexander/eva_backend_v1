import { Injectable } from '@nestjs/common';
import { EventoParticipantes } from 'src/entities/eventoparticipantes.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class EventoparticipantesService {
  constructor(private datasource: DataSource) {}

  findByEvent(id: number) {
    return this.datasource.manager.find(EventoParticipantes, {
      where: { evento_id: id },
      relations: ['usuario', 'evento'],
    });
  }

  registerEventParticipant(dto: Partial<EventoParticipantes>) {
    return this.datasource.transaction(async (manager) => {
      const eventParticipant = manager.create(EventoParticipantes, { ...dto });

      return manager.save(eventParticipant);
    });
  }
}
