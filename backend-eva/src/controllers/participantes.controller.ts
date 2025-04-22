import { Controller, Get, Param } from '@nestjs/common';
import { ParticipantesService } from 'src/services/participantes.service';

@Controller('participantes')
export class ParticipantesController {
  constructor(private participanteService: ParticipantesService) {}

  @Get()
  findAll() {
    return this.participanteService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.participanteService.findOneById(id);
  }
}
