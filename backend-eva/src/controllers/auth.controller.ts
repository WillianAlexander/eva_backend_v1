/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('validate-token')
  async validateToken(@Query('token') token: string) {
    try {
      if (!token) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: 'Token no proporcionado',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const payload = this.authService.validateToken(token);
      return {
        valid: true,
        payload, // Devuelve el payload del token si es válido
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: error.message || 'Token inválido o expirado',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
