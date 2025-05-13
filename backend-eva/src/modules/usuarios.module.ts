import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosController } from 'src/controllers/usuarios.controller';
import { Usuarios } from 'src/entities/usuarios.entity';
import { UsuariosService } from 'src/services/usuarios.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/services/auth.service';

@Module({
  controllers: [UsuariosController],
  exports: [UsuariosService],
  imports: [
    TypeOrmModule.forFeature([Usuarios]),
    JwtModule.register({
      secret: 'cacpeg1*', // La misma que usas en Flutter para firmar
      signOptions: { expiresIn: '10m' }, // Opcional: duración de los tokens
    }),
  ],
  providers: [UsuariosService, JwtAuthGuard, AuthService],
})
export class UsuariosModule {}
