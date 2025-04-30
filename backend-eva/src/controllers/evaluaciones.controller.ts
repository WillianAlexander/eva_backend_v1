/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RegistrarEvaluacionDto } from 'src/dto/evaluacion/registrar-evaluacion.dto';
import { Evaluaciones } from 'src/entities/evaluaciones.entity';
import { EvaluacionesService } from 'src/services/evaluaciones.service';

@Controller('evaluaciones')
export class EvaluacionesController {
  constructor(private evaluacionService: EvaluacionesService) {}

  @Post('find')
  async findByAny(@Body() options: Partial<Evaluaciones>) {
    return this.evaluacionService.findByAny(options);
  }

  @Post()
  async registerEvaluation(@Body() dto: RegistrarEvaluacionDto) {
    try {
      return await this.evaluacionService.registerEvaluation(dto);
    } catch (error) {
      if (error.code === '23505') {
        // Error de llave duplicada
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            message: error.detail, // Enviar el mensaje exacto del error
          },
          HttpStatus.CONFLICT,
        );
      }
      // Otros errores
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error interno del servidor',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
