/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateEventoParticipante } from 'src/dto/evento_participante/create-eventoparticipante.dto';
import { EventoparticipantesService } from 'src/services/eventoparticipantes.service';

@Controller('eventoparticipantes')
export class EventoparticipantesController {
  constructor(private eventoparticipantesService: EventoparticipantesService) {}

  @Get(':id')
  findByEvent(@Param('id') id: number) {
    return this.eventoparticipantesService.findByEvent(id);
  }

  @Post()
  registerEventParticipant(@Body() dto: CreateEventoParticipante) {
    return this.eventoparticipantesService.registerEventParticipant(dto);
  }

  @Delete(':eventoId/:participanteId')
  async deleteParticipant(
    @Param('eventoId') eventoId: number,
    @Param('participanteId') participanteId: number,
  ) {
    try {
      await this.eventoparticipantesService.deleteParticipant(
        eventoId,
        participanteId,
      );

      return {
        message: 'Participante eliminado correctamente',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: error.message || 'Error al eliminar el participante',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
