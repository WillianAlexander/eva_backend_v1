/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUsuarioDto } from 'src/dto/usuario/create-usuario.dto';
import { UsuariosService } from 'src/services/usuarios.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { AuthService } from 'src/services/auth.service';

@Controller('usuarios')
@UseGuards(JwtAuthGuard)
export class UsuariosController {
  constructor(
    private usuariosService: UsuariosService,
    private authService: AuthService,
  ) {}

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
  async createUser(@Body() dto: CreateUsuarioDto) {
    try {
      const usuario = await this.usuariosService.createuser(dto);
      const token = await this.authService.login(usuario);
      console.log({ token });
      return usuario;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          code: error.code,
          message: error.message || 'Error creating user',
          detail: error.detail,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':usuario')
  remove(@Param('usuario') usuario: string) {
    return this.usuariosService.remove(usuario);
  }
}
