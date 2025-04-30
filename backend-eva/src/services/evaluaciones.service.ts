import { Injectable } from '@nestjs/common';
import { RegistrarEvaluacionDto } from 'src/dto/evaluacion/registrar-evaluacion.dto';
import { Evaluaciones } from 'src/entities/evaluaciones.entity';
import { DataSource, FindOptionsWhere } from 'typeorm';

@Injectable()
export class EvaluacionesService {
  constructor(private datasource: DataSource) {}

  findByAny(options: FindOptionsWhere<Evaluaciones>) {
    return this.datasource.manager.find(Evaluaciones, { where: options });
  }

  registerEvaluation(dto: RegistrarEvaluacionDto) {
    return this.datasource.transaction(async (manager) => {
      const evaluacion = manager.create(Evaluaciones, { ...dto });
      return manager.save(evaluacion);
    });
  }
}
