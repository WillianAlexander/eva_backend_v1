import { Injectable } from '@nestjs/common';
import { CrearParticipanteDto } from 'src/dto/create-participante.dto';
import { Participantes } from 'src/entities/participantes.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class ParticipantesService {
  constructor(private datasource: DataSource) {}

  findAll() {
    return this.datasource.manager.findBy(Participantes, {
      fhasta: new Date('2999-12-31 00:00:00'),
    });
  }

  findOneById(id: number) {
    return this.datasource.manager.findOneBy(Participantes, {
      id: id,
      fhasta: new Date('2999-12-31 00:00:00'),
    });
  }

  createParticipant(dto: CrearParticipanteDto) {
    return this.datasource.transaction(async (manager) => {
      const participant = manager.create(Participantes, dto);
      return manager.save(participant);
    });
  }
}
