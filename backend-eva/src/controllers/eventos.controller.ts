import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CrearEventoDto } from 'src/dto/evento/crear-evento.dto';
import { EventosService } from 'src/services/eventos.service';

@Controller('eventos')
export class EventosController {
  constructor(private eventoService: EventosService) {}

  @Get()
  findAll() {
    return this.eventoService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.eventoService.findOneById(id);
  }

  @Post()
  createEvent(@Body() dto: CrearEventoDto) {
    return this.eventoService.createEvent(dto);
  }
}
