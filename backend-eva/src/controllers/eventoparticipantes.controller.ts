import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateEventoParticipante } from 'src/dto/create-eventoparticipante.dto';
import { EventoparticipantesService } from 'src/services/eventoparticipantes.service';

@Controller('eventoparticipantes')
export class EventoparticipantesController {
  constructor(private eventParticipantService: EventoparticipantesService) {}

  @Get(':id')
  findByEvent(@Param('id') id: number) {
    return this.eventParticipantService.findByEvent(id);
  }

  @Post()
  registerEventParticipant(@Body() dto: CreateEventoParticipante) {
    return this.eventParticipantService.registerEventParticipant(dto);
  }
}
