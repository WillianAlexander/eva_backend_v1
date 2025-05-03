import { Injectable } from '@nestjs/common';
import { CrearEventoDto } from 'src/dto/evento/crear-evento.dto';
import { Eventos } from 'src/entities/eventos.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class EventosService {
  constructor(private datasource: DataSource) {}

  findAll() {
    return this.datasource.manager.find(Eventos, {
      where: { fhasta: new Date('2999-12-31 00:00:00') },
      order: { fevento: 'DESC' },
    });
  }

  findOneById(id: number) {
    return this.datasource.manager.findOneBy(Eventos, {
      id: id,
      fhasta: new Date('2999-12-31 00:00:00'),
    });
  }

  findOneByState(state: string) {
    return this.datasource.manager.findBy(Eventos, {
      estado: state,
      fhasta: new Date('2999-12-31 00:00:00'),
    });
  }

  createEvent(dto: CrearEventoDto) {
    return this.datasource.transaction(async (manager) => {
      const evento = manager.create(Eventos, { ...dto });
      return manager.save(evento);
    });
  }

  async getDetailEvent(eventoid: number) {
    try {
      const sql: string = `
        SELECT evaluado_id, COALESCE(actual, 0) as actual, COALESCE(anterior, 0) as anterior, COALESCE(anterior2, 0) as anterior2
        FROM eva.crosstab(
          $$SELECT 
              evaluado_id, 
              evento_id, 
              (criterio1 + criterio2 + criterio3 + criterio4) AS total
            FROM eva.evaluaciones
            WHERE evento_id <= ${eventoid}
            ORDER BY evaluado_id, evento_id DESC$$
        ) AS ct (
          evaluado_id INT,
          actual      INT,
          anterior    INT,
          anterior2   INT
        );
      `;

      // Ejecuta la consulta
      return await this.datasource.query(sql);
    } catch (error) {
      throw new Error(`Error executing query: ${error.message}`);
    }
  }
}
