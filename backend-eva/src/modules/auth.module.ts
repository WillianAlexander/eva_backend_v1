import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Clave secreta desde las variables de entorno
      signOptions: { expiresIn: '7d' }, // Configuración de expiración predeterminada
    }),
  ],
  controllers: [AuthController], // Controladores del módulo
  providers: [AuthService], // Servicios del módulo
  exports: [AuthService], // Exporta AuthService para que otros módulos puedan usarlo
})
export class AuthModule {}
