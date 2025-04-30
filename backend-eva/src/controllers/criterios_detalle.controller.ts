import { Controller, Get } from '@nestjs/common';
import { CriteriosDetalleService } from 'src/services/criterios_detalle.service';

@Controller('criterios-detalle')
export class CriteriosDetalleController {
  constructor(private criteriosService: CriteriosDetalleService) {}

  @Get()
  findAll() {
    return this.criteriosService.findAll();
  }
}
