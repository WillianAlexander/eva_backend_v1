import { Body, Controller, Post } from '@nestjs/common';
import { Evaluaciones } from 'src/entities/evaluaciones.entity';
import { EvaluacionesService } from 'src/services/evaluaciones.service';

@Controller('evaluaciones')
export class EvaluacionesController {
  constructor(private evaluacionService: EvaluacionesService) {}

  @Post('find')
  findByAny(@Body() options: Partial<Evaluaciones>) {
    return this.evaluacionService.findByAny(options);
  }
}
