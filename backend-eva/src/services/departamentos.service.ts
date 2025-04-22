import { Injectable } from '@nestjs/common';
import { Departamentos } from 'src/entities/departamentos.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class DepartamentosService {
  constructor(private datasource: DataSource) {}

  findAll() {
    return this.datasource.manager.findBy(Departamentos, {
      fhasta: new Date('2999-12-31 00:00:00'),
    });
  }

  findOneById(id: number) {
    return this.datasource.manager.findOneBy(Departamentos, {
      id: id,
      fhasta: new Date('2999-12-31 00:00:00'),
    });
  }

  createDepartment(nombre: string) {
    return this.datasource.transaction(async (manager) => {
      const departamento = manager.create(Departamentos, { nombre });
      return manager.save(departamento);
    });
  }
}
