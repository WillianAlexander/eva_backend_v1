import { Injectable } from '@nestjs/common';
import { CrearEventoDto } from 'src/dto/evento/crear-evento.dto';
import { Eventos } from 'src/entities/eventos.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class EventosService {
  constructor(private datasource: DataSource) {}

  findAll() {
    return this.datasource.manager.findBy(Eventos, {
      fhasta: new Date('2999-12-31 00:00:00'),
    });
  }

  findOneById(id: number) {
    return this.datasource.manager.findOneBy(Eventos, {
      id: id,
      fhasta: new Date('2999-12-31 00:00:00'),
    });
  }

  createEvent(dto: CrearEventoDto) {
    return this.datasource.transaction(async (manager) => {
      const evento = manager.create(Eventos, { ...dto });
      return manager.save(evento);
    });
  }
}
