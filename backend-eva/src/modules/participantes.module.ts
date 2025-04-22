import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipantesController } from 'src/controllers/participantes.controller';
import { Participantes } from 'src/entities/participantes.entity';
import { ParticipantesService } from 'src/services/participantes.service';

@Module({
  controllers: [ParticipantesController],
  exports: [ParticipantesService],
  imports: [TypeOrmModule.forFeature([Participantes])],
  providers: [ParticipantesService],
})
export class ParticipantesModule {}
