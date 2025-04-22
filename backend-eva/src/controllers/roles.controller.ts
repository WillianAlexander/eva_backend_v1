import { Controller, Get, Param } from '@nestjs/common';
import { RolesService } from 'src/services/roles.service';

@Controller('roles')
export class RolesController {
  constructor(private rolService: RolesService) {}

  @Get()
  findAll() {
    return this.rolService.findAll();
  }

  @Get(':id')
  finOneById(@Param('id') id: number) {
    return this.rolService.findOneById(id);
  }
}
