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

  async deleteParticipant(eventoId: number, participanteId: number) {
    return this.datasource.transaction(async (manager) => {
      // Busca el registro de EventoParticipantes
      const eventParticipant = await manager.findOne(EventoParticipantes, {
        where: { evento_id: eventoId, participante_id: participanteId },
      });

      if (!eventParticipant) {
        throw new Error(
          `No se encontró el participante con ID ${participanteId} en el evento con ID ${eventoId}.`,
        );
      }

      // Elimina el registro
      return manager.remove(eventParticipant);
    });
  }
}
