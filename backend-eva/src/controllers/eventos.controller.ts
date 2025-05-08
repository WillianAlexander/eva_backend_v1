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

  @Get('/ready-to-close/:id')
  async isReadyToClose(@Param('id') id: number) {
    try {
      const isReady = await this.eventoService.isEventReadyToClose(id);
      return { eventId: id, readyToClose: isReady };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: error.message || 'Error checking if event is ready to close',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/departments-progress/:id')
  async getEventDepartmentProgress(@Param('id') id: number) {
    try {
      const progress = await this.eventoService.eventDeparmentProgress(id);
      return { eventId: id, progress };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: error.message || 'Error fetching department progress',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/unrated-departments/:eventoId/:usuario/:idDep')
  async getUnRatedDepartments(
    @Param('eventoId') eventoId: number,
    @Param('usuario') usuario: string,
    @Param('idDep') idDep: number,
  ) {
    try {
      const result = await this.eventoService.unRatedDepartments(
        eventoId,
        usuario,
        idDep,
      );
      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: error.message || 'Error fetching unrated departments',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
