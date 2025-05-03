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
        SELECT 
          dp.nombre as evaluado_id,
          actual,
          DENSE_RANK() OVER (ORDER BY actual, evaluado_id DESC) AS posicion_actual,
          anterior,
          CASE WHEN anterior = 0 THEN ' ' ELSE DENSE_RANK() OVER (ORDER BY anterior, evaluado_id DESC)::text END posicion_anterior,
          anterior2,
          CASE WHEN anterior2 = 0 THEN ' ' ELSE DENSE_RANK() OVER (ORDER BY anterior2, evaluado_id DESC)::text END posicion_anterior2
        FROM (
          SELECT 
            evaluado_id, 
            COALESCE(actual, 0) AS actual, 
            COALESCE(anterior, 0) AS anterior, 
            COALESCE(anterior2, 0) AS anterior2 
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
          )
        ) AS datos
        INNER JOIN eva.departamentos dp on (dp.id = evaluado_id and fhasta > current_date);
      `;

      // Ejecuta la consulta
      return await this.datasource.query(sql);
    } catch (error) {
      throw new Error(`Error executing query: ${error.message}`);
    }
  }
}
