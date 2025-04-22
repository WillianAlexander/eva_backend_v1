import { Controller, Get, Param } from '@nestjs/common';
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
}
