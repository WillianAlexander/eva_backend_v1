import { Injectable } from '@nestjs/common';
import { Roles } from 'src/entities/roles.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(private dataSource: DataSource) {}

  async findAll() {
    return await this.dataSource.manager.find(Roles, {
      where: { fhasta: new Date('2999-12-31 00:00:00') },
    });
  }

  findOneById(id: number) {
    return this.dataSource.manager.findOneBy(Roles, {
      id: id,
      fhasta: new Date('2999-12-31 00:00:00'),
    });
  }
}
