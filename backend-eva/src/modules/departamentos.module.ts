import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartamentosController } from 'src/controllers/departamentos.controller';
import { Departamentos } from 'src/entities/departamentos.entity';
import { DepartamentosService } from 'src/services/departamentos.service';

@Module({
  controllers: [DepartamentosController],
  exports: [DepartamentosService],
  imports: [TypeOrmModule.forFeature([Departamentos])],
  providers: [DepartamentosService],
})
export class DepartamentosModule {}
