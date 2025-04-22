import { Controller, Get, Param } from '@nestjs/common';
import { DepartamentosService } from 'src/services/departamentos.service';

@Controller('departamentos')
export class DepartamentosController {
  constructor(private departamentoService: DepartamentosService) {}

  @Get()
  findAll() {
    return this.departamentoService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.departamentoService.findOneById(id);
  }
}
