/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: {
    nombres: string;
    identificacion: string;
    correo: string;
  }) {
    const payload = {
      nombres: user.nombres, // Nombre completo del usuario
      correo: user.correo, // Correo electrónico
      identificacion: user.identificacion, // Identificación del usuario
    };

    const token = this.jwtService.sign(payload, {
      expiresIn: '7d', // Token válido por 7 días
      secret: process.env.JWT_SECRET, // Clave secreta desde las variables de entorno
    });

    return { access_token: token };
  }
}
