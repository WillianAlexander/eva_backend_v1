import { Injectable } from '@nestjs/common';
import { CreateEventoParticipante } from 'src/dto/evento_participante/create-eventoparticipante.dto';
import { EventoParticipantes } from 'src/entities/eventoparticipantes.entity';
import { Departamentos } from 'src/entities/departamentos.entity';
import { DataSource } from 'typeorm';
import { Eventos } from 'src/entities/eventos.entity';

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
      // Busca las entidades relacionadas (evento y departamento)
      const evento = await manager.findOneOrFail(Eventos, {
        where: { id: dto.evento_id },
      });

      const departamento = await manager.findOneOrFail(Departamentos, {
        where: { id: dto.participante_id },
      });

      // Crea el registro de EventoParticipantes con las relaciones
      const eventParticipant = manager.create(EventoParticipantes, {
        evento,
        departamento,
      });

      // Guarda el registro
      return manager.save(eventParticipant);
    });
  }
}
