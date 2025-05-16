/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
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
           NOMBRE as evaluado_id,
           SUM(ACTUAL) as ACTUAL,
           SUM(FILA) as posicion_actual,
           SUM(ANTERIOR) as ANTERIOR,
           SUM(FILA2) as posicion_anterior
           FROM ((SELECT
              ROW_NUMBER() OVER (ORDER BY actual DESC) FILA,
              dp.NOMBRE,
              COALESCE(actual, 0) AS actual,
              0 FILA2,
              COALESCE(anterior, 0) AS anterior
            FROM (SELECT
                  evaluado_id,
                  evento_id,
                  SUM(coalesce(criterio1, 0) + coalesce(criterio2, 0) + coalesce(criterio3, 0) + coalesce(criterio4, 0)) AS actual,
                  0 anterior
                FROM eva.evaluaciones
                WHERE evento_id = ${eventoid}
                AND EXISTS (
                  SELECT 1
                  FROM eva.evaluaciones e2
                  WHERE e2.evento_id = ${eventoid}
                )
                GROUP BY evaluado_id, evento_id) as a
                INNER JOIN eva.departamentos dp on (dp.id = evaluado_id and fhasta > current_date)
                ORDER BY actual DESC)
                UNION
            (SELECT
              0 FILA,
              dp.NOMBRE,
              COALESCE(actual, 0) AS actual,
              ROW_NUMBER() OVER (ORDER BY anterior DESC) FILA2,
              COALESCE(anterior, 0) AS anterior
            FROM (
              SELECT
                  evaluado_id,
                  evento_id,
                  0 actual,
                  SUM(coalesce(criterio1, 0) + coalesce(criterio2, 0) + coalesce(criterio3, 0) + coalesce(criterio4, 0)) as anterior
                FROM eva.evaluaciones
                WHERE evento_id = (SELECT max(id) from eva.eventos where id < ${eventoid} and fhasta > current_date)
                AND EXISTS (
                  SELECT 1
                  FROM eva.evaluaciones e2
                  WHERE e2.evento_id = ${eventoid}
                )
                GROUP BY evaluado_id, evento_id
                ORDER BY evaluado_id, evento_id DESC
              ) as b
              INNER JOIN eva.departamentos dp on (dp.id = evaluado_id and fhasta > current_date))) as c
              GROUP BY evaluado_id
              ORDER BY SUM(FILA) ASC
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
              ROW_NUMBER() OVER (ORDER BY actual DESC) FILA,
              dp.NOMBRE as departamento,
              (COALESCE(actual, 0)) AS total,
              (actual / 15) as promedio,
              mes
            FROM (SELECT
                  evaluado_id,
                  evento_id,
                  SUM(COALESCE(criterio1, 0) + COALESCE(criterio2, 0) + COALESCE(criterio3, 0) + COALESCE(criterio4, 0)) AS actual,
                  UPPER(TO_CHAR(fevaluacion - INTERVAL '1 month', 'TMMonth')) AS mes
                FROM eva.evaluaciones
                WHERE evento_id = (select max(ev1.id) from eva.eventos ev1 where ev1.fhasta > current_date and ev1.estado = 'CERRADO')
                AND EXISTS (
                  SELECT 1
                  FROM eva.evaluaciones e2
                  WHERE e2.evento_id = (select max(ev2.id) from eva.eventos ev2 where ev2.fhasta > current_date and ev2.estado = 'CERRADO')
                )
                GROUP BY evaluado_id, evento_id, fevaluacion) as c
                INNER JOIN eva.departamentos dp on (dp.id = evaluado_id and fhasta > current_date)
                ORDER BY actual DESC
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

  async updateEvent(id: number, partialEvent: Partial<Eventos>) {
    return this.datasource.transaction(async (manager) => {
      // Busca el evento existente
      const existingEvent = await manager.findOneBy(Eventos, { id });

      if (!existingEvent) {
        throw new Error(`Event with ID ${id} not found.`);
      }

      // Combina los campos existentes con los nuevos
      const updatedEvent = manager.merge(Eventos, existingEvent, partialEvent);

      // Guarda los cambios
      return manager.save(Eventos, updatedEvent);
    });
  }

  async isEventReadyToClose(id: number) {
    try {
      const query = `
        SELECT CASE 
                 WHEN COUNT(*) * (COUNT(*) - 1) = (
                   SELECT COUNT(*) 
                   FROM eva.evaluaciones 
                   WHERE evento_id = ${id}
                 ) THEN TRUE 
                 ELSE FALSE 
               END AS cumple
        FROM eva.eventoparticipantes 
        WHERE evento_id = ${id}
      `;

      const result = await this.datasource.query(query);

      // Devuelve el resultado como un booleano
      console.log(`Estado del evento conteo: ${result[0]?.cumple}`);
      return result[0]?.cumple === true;
    } catch (error) {
      throw new Error(
        `Error checking if event is ready to close: ${error.message}`,
      );
    }
  }

  async eventDeparmentProgress(id: number) {
    try {
      const query = `
      SELECT
      USR.USUARIO,
      DEP.ID,
      DEP.NOMBRE as departamento, 
      ROUND(((totl / tevaluadores::double precision) * 100)::numeric, 2) AS porcentaje
      FROM (
          SELECT evaluador_id, 
                 COUNT(evaluador_id) AS totl,
                 (SELECT count(*) - 1 FROM EVA.EVENTOPARTICIPANTES WHERE EVENTO_ID = ${id}) as tevaluadores
          FROM eva.EVALUACIONES 
          WHERE evento_id = ${id}
          GROUP BY evaluador_id
      ) AS sub
      INNER JOIN eva.USUARIOS USR ON (USR.USUARIO = sub.evaluador_id and USR.FHASTA > current_date)
      INNER JOIN eva.DEPARTAMENTOS DEP ON (DEP.ID = USR.DEPARTAMENTO_ID AND DEP.FHASTA > current_date)
      ORDER BY DEP.ID
      `;

      const result = await this.datasource.query(query);
      return result;
    } catch (error) {
      throw new Error(`Error progreso departamentos: ${error.message}`);
    }
  }

  async unRatedDepartments(eventoId: number, usuario: string, idDep: number) {
    try {
      const query = `
        SELECT
        DP.NOMBRE as departamento
        FROM
            eva.EVENTOPARTICIPANTES EVP
        LEFT JOIN 
            eva.DEPARTAMENTOS DP 
        ON 
            ( 
            DP.ID = EVP.participante_id 
        AND DP.FHASTA > CURRENT_DATE )
        WHERE
            EVENTO_ID = ${eventoId}
            AND DP.ID NOT IN (
                  SELECT evaluado_id 
                  FROM EVA.EVALUACIONES 
                  WHERE evento_id = ${eventoId}
                  AND evaluador_id = '${usuario}'
                )
        AND DP.ID <> ${idDep}  
      `;

      const result = await this.datasource.query(query);

      // Controla si la consulta devuelve un resultado vacío
      if (result.length === 0) {
        return { message: 'No unrated departments found', data: [] };
      }

      return {
        message: 'Unrated departments retrieved successfully',
        data: result,
      };
    } catch (error) {
      throw new Error(
        `Error al obtener departamentos sin calificación: ${error.message}`,
      );
    }
  }
}
