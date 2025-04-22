import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUsuarioDto } from 'src/dto/create-usuario.dto';
import { UsuariosService } from 'src/services/usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private usuarioService: UsuariosService) {}

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':usuario')
  findOneById(@Param('usuario') usuario: string) {
    return this.usuarioService.findOneById(usuario);
  }

  @Post()
  createUser(@Body() dto: CreateUsuarioDto) {
    return this.usuarioService.createuser(dto);
  }

  @Delete(':usuario')
  remove(@Param('usuario') usuario: string) {
    return this.usuarioService.remove(usuario);
  }
}
