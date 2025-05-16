/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: {
    usuario: string;
    nombres: string;
    identificacion: string;
    correo: string;
  }) {
    const payload = {
      usuario: user.usuario,
      nombres: user.nombres, // Nombre completo del usuario
      correo: user.correo, // Correo electrónico
      identificacion: user.identificacion, // Identificación del usuario
    };

    if (!process.env.JWT_SECRET) {
      throw new Error(
        'JWT_SECRET no está configurado en las variables de entorno',
      );
    }

    const token = this.jwtService.sign(payload, {
      expiresIn: '7d', // Token válido por 7 días
      secret: process.env.JWT_SECRET, // Clave secreta desde las variables de entorno
    });

    const decodedToken = this.jwtService.decode(token);

    return {
      access_token: token,
      expires_at: new Date(decodedToken.exp * 1000),
    };
  }

  validateToken(token: string): any {
    try {
      // Verifica el token usando la clave secreta
      return this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET, // Clave secreta desde las variables de entorno
      });
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
