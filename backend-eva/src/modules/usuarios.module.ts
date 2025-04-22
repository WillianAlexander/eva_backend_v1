import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosController } from 'src/controllers/usuarios.controller';
import { Usuarios } from 'src/entities/usuarios.entity';
import { UsuariosService } from 'src/services/usuarios.service';

@Module({
  controllers: [UsuariosController],
  exports: [UsuariosService],
  imports: [TypeOrmModule.forFeature([Usuarios])],
  providers: [UsuariosService],
})
export class UsuariosModule {}
