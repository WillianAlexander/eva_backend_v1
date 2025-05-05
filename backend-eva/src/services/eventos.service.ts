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
        SELECT evaluado_id,
          SUM(actual) as actual,
          SUM(posicion_actual) as posicion_actual,
          SUM(anterior) as anterior,
          SUM(posicion_anterior) as posicion_anterior
          FROM (SELECT
            dp.nombre as evaluado_id,
            actual,
            DENSE_RANK() OVER (ORDER BY fila, actual DESC) AS posicion_actual,
            anterior,
            0 posicion_anterior
          FROM (
            SELECT
              ROW_NUMBER() OVER (ORDER BY actual DESC) FILA,
              evaluado_id, 
              COALESCE(actual, 0) AS actual, 
              COALESCE(anterior, 0) AS anterior
            FROM eva.crosstab(
              $$SELECT 
                  evaluado_id, 
                  evento_id, 
                  (criterio1 + criterio2 + criterio3 + criterio4) AS total
                FROM eva.evaluaciones
                WHERE evento_id = ${eventoid}
                AND EXISTS (
                  SELECT 1
                  FROM eva.evaluaciones e2 
                  WHERE e2.evento_id = ${eventoid}
                )
                ORDER BY evaluado_id, evento_id DESC$$
            ) AS ct (
              evaluado_id INT,
              actual      INT,
              anterior    INT
            )
          ) AS datos
          INNER JOIN eva.departamentos dp on (dp.id = evaluado_id and fhasta > current_date)
          UNION
          SELECT 
            dp.nombre as evaluado_id,
            0 actual,
            0 posicion_actual,
            anterior,
            DENSE_RANK() OVER (ORDER BY fila2, anterior DESC) AS posicion_anterior
          FROM (
            SELECT
              evaluado_id, 
              COALESCE(actual, 0) AS actual,
              ROW_NUMBER() OVER (ORDER BY anterior DESC) FILA2, 
              COALESCE(anterior, 0) AS anterior
            FROM eva.crosstab(
              $$SELECT 
                  evaluado_id, 
                  evento_id, 
                  (criterio1 + criterio2 + criterio3 + criterio4) AS total
                FROM eva.evaluaciones
                WHERE evento_id < ${eventoid}
                AND EXISTS (
                  SELECT 1
                  FROM eva.evaluaciones e2 
                  WHERE e2.evento_id = ${eventoid}
                )
                ORDER BY evaluado_id, evento_id DESC$$
            ) AS ct (
              evaluado_id INT,
              actual      INT,
              anterior    INT
            )
          ) AS datos
          INNER JOIN eva.departamentos dp on (dp.id = evaluado_id and fhasta > current_date))
          GROUP BY evaluado_id
          ORDER BY posicion_actual
      `;

      console.log(`eventoid: ${eventoid}`);
      return await this.datasource.query(sql);
    } catch (error) {
      throw new Error(`Error executing query: ${error.message}`);
    }
  }

  async getRates() {
    try {
      const sql: string = `
        SELECT 
        DEPARTAMENTO, 
        TOTAL, 
        ( TOTAL / 15 ) PROMEDIO,
        MES
        FROM (SELECT
        dp.NOMBRE AS DEPARTAMENTO,
        SUM(criterio1 + criterio2 + criterio3 + criterio4) AS total,
        UPPER(TO_CHAR(fevaluacion, 'TMMonth')) AS MES
        FROM eva.evaluaciones
        INNER JOIN eva.departamentos dp on (dp.id = evaluado_id and fhasta > current_date)
        WHERE 
        evento_id = (select max(id) from eva.eventos where fhasta > current_date and estado = 'CERRADO')
        GROUP BY dp.NOMBRE, fevaluacion)
        ORDER BY TOTAL DESC
      `;

      return await this.datasource.query(sql);
    } catch (error) {
      throw new Error(`Error executing query: ${error.message}`);
    }
  }

  closeEvent(id: number) {
    return this.datasource.transaction(async (manager) => {
      // Busca un único evento por ID y fhasta
      try {
        const event = await manager.findOneBy(Eventos, {
          id: id,
          fhasta: new Date('2999-12-31 00:00:00'),
        });

        if (!event) {
          throw new Error(`Event with ID ${id} not found or already closed.`);
        }

        // Actualiza el estado del evento a 'CERRADO'
        return manager.update(Eventos, { id: event.id }, { estado: 'CERRADO' });
      } catch (error) {
        throw new Error(error);
      }
    });
  }
}
