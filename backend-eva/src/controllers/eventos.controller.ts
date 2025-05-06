/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CrearEventoDto } from 'src/dto/evento/crear-evento.dto';
import { Eventos } from 'src/entities/eventos.entity';
import { EventosService } from 'src/services/eventos.service';

@Controller('eventos')
export class EventosController {
  constructor(private eventoService: EventosService) {}

  @Get()
  findAll() {
    return this.eventoService.findAll();
  }

  @Get('rates')
  getRates() {
    return this.eventoService.getRates();
  }

  @Get('estado/:state')
  findOneByState(@Param('state') state: string) {
    return this.eventoService.findOneByState(state);
  }

  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.eventoService.findOneById(id);
  }

  @Post()
  createEvent(@Body() dto: CrearEventoDto) {
    return this.eventoService.createEvent(dto);
  }

  @Get('/detalles/:id')
  getDetailEvent(@Param('id') id: number) {
    return this.eventoService.getDetailEvent(id);
  }

  @Patch('/cerrar/:id')
  closEvent(@Param('id') id: number) {
    return this.eventoService.closeEvent(id);
  }

  @Patch('/actualizar/:id')
  async updateEvent(
    @Param('id') id: number,
    @Body() partialEvent: Partial<Eventos>,
  ) {
    try {
      return await this.eventoService.updateEvent(id, partialEvent);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: error.message || 'Error updating event',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
