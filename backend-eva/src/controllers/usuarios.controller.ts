import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUsuarioDto } from 'src/dto/usuario/create-usuario.dto';
import { UsuariosService } from 'src/services/usuarios.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('usuarios')
@UseGuards(JwtAuthGuard) // Aplica el guard a todas las rutas del controlador
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':usuario')
  findOneById(@Param('usuario') usuario: string) {
    return this.usuariosService.findOneById(usuario);
  }

  @Get('departamento/:id')
  findUsersByDepartment(@Param('id') id: number) {
    return this.usuariosService.findUsersByDepartment(id);
  }

  @Post()
  createUser(@Body() dto: CreateUsuarioDto) {
    return this.usuariosService.createuser(dto);
  }

  @Delete(':usuario')
  remove(@Param('usuario') usuario: string) {
    return this.usuariosService.remove(usuario);
  }
}
