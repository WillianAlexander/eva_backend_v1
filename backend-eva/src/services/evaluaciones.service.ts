import { Injectable } from '@nestjs/common';
import { Evaluaciones } from 'src/entities/evaluaciones.entity';
import { DataSource, FindOptionsWhere } from 'typeorm';

@Injectable()
export class EvaluacionesService {
  constructor(private datasource: DataSource) {}

  findByAny(options: FindOptionsWhere<Evaluaciones>) {
    return this.datasource.manager.find(Evaluaciones, { where: options });
  }
}
