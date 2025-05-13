/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: any) {
    const payload = {
      nombres: user.nombres as string,
      apellidos: user.apellidos as string,
      correo: user.correo as string,
      identificacion: user.identificacion as string,
    };

    const token = this.jwtService.sign(payload, {
      expiresIn: '7d', // válido por 7 días
      secret: 'cacpeg1*', // usa env
    });

    return { access_token: token };
  }
}
