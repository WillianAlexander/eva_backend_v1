import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventosController } from 'src/controllers/eventos.controller';
import { Eventos } from 'src/entities/eventos.entity';
import { EventosService } from 'src/services/eventos.service';

@Module({
  controllers: [EventosController],
  exports: [EventosService],
  imports: [TypeOrmModule.forFeature([Eventos])],
  providers: [EventosService],
})
export class EventosModule {}
