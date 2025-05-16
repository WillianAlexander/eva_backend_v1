import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosController } from 'src/controllers/usuarios.controller';
import { Usuarios } from 'src/entities/usuarios.entity';
import { UsuariosService } from 'src/services/usuarios.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth.module';

@Module({
  controllers: [UsuariosController],
  exports: [UsuariosService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Usuarios]),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // La misma que usas en Flutter para firmar
      signOptions: { expiresIn: '10m' }, // Opcional: duración de los tokens
    }),
  ],
  providers: [UsuariosService, JwtAuthGuard],
})
export class UsuariosModule {}
