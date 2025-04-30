import { Injectable } from '@nestjs/common';
import { CriteriosDetalle } from 'src/entities/criterios-detalle.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class CriteriosDetalleService {
  constructor(private datasource: DataSource) {}

  findAll() {
    return this.datasource.manager.findBy(CriteriosDetalle, {
      fhasta: new Date('2999-12-31 00:00:00'),
    });
  }
}
