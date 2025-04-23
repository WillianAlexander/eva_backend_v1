import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventoparticipantesController } from 'src/controllers/eventoparticipantes.controller';
import { EventoParticipantes } from 'src/entities/eventoparticipantes.entity';
import { EventoparticipantesService } from 'src/services/eventoparticipantes.service';

@Module({
  controllers: [EventoparticipantesController],
  exports: [EventoparticipantesService],
  imports: [TypeOrmModule.forFeature([EventoParticipantes])],
  providers: [EventoparticipantesService],
})
export class EventoparticipantesModule {}
