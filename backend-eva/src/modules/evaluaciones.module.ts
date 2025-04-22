import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluacionesController } from 'src/controllers/evaluaciones.controller';
import { Evaluaciones } from 'src/entities/evaluaciones.entity';
import { EvaluacionesService } from 'src/services/evaluaciones.service';

@Module({
  controllers: [EvaluacionesController],
  exports: [EvaluacionesService],
  imports: [TypeOrmModule.forFeature([Evaluaciones])],
  providers: [EvaluacionesService],
})
export class EvaluacionesModule {}
