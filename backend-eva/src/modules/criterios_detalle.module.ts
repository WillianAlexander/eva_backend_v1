import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CriteriosDetalleController } from 'src/controllers/criterios_detalle.controller';
import { CriteriosDetalle } from 'src/entities/criterios-detalle.entity';
import { CriteriosDetalleService } from 'src/services/criterios_detalle.service';

@Module({
  controllers: [CriteriosDetalleController],
  exports: [CriteriosDetalleService],
  imports: [TypeOrmModule.forFeature([CriteriosDetalle])],
  providers: [CriteriosDetalleService],
})
export class CriteriosDetalleModule {}
