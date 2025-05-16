/* eslint-disable @typescript-eslint/no-unsafe-return */
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
import { QueryFailedError } from 'typeorm';

@Controller('usuarios')
@UseGuards(JwtAuthGuard)
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
  async createUser(@Body() dto: CreateUsuarioDto) {
    try {
      const usuario = await this.usuariosService.createuser(dto);
      return usuario;
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.driverError.code === '23505'
      ) {
        if (error.message.includes('usuarios_departamento_id_key')) {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              codigo: error.driverError.code,
              constraint: error.driverError.constraint,
              message: error.message || 'Error creating user',
              detail: 'Ya existe un usuario con el departamento seleccionado',
            },
            HttpStatus.BAD_REQUEST,
          );
        }
      }

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

  @Post('login')
  async login(
    @Body() body: { usuario: string; password: string; token?: string },
  ) {
    try {
      const { usuario, password, token } = body;
      return await this.usuariosService.login(usuario, password, token);
    } catch (error) {
      throw new HttpException(
        {
          status: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Error interno del servidor',
          details: error.details || null,
        },
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':usuario')
  remove(@Param('usuario') usuario: string) {
    return this.usuariosService.remove(usuario);
  }
}
