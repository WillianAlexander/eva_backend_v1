/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/pdf/pdf.controller.ts
import {
  Controller,
  Param,
  HttpException,
  HttpStatus,
  Body,
  Post,
} from '@nestjs/common';
import { PdfService } from 'src/services/pdf.service';
import { EventosService } from 'src/services/eventos.service';

@Controller('pdf')
export class PdfController {
  constructor(
    private readonly pdfService: PdfService,
    private readonly eventosService: EventosService,
  ) {}

  @Post('ranking/:eventoid')
  async generatePDF(
    @Param('eventoid') eventoid: number,
    @Body() body: { titulo: string; encabezados: string[] },
  ) {
    try {
      const { titulo, encabezados } = body;

      // Validar que el cuerpo de la solicitud tenga los datos necesarios
      if (!titulo || !encabezados || encabezados.length !== 3) {
        throw new HttpException(
          'El cuerpo de la solicitud debe incluir un título y tres encabezados',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Obtén los datos del evento desde EventosService
      const data = await this.eventosService.getDetailEvent(eventoid);
      console.log(`data: ${JSON.stringify(data)}`);
      if (!data || data.length === 0) {
        throw new HttpException(
          'No se encontraron datos para generar el PDF',
          HttpStatus.NOT_FOUND,
        );
      }

      // Genera el PDF y obtén tanto el path como el base64
      const { pathUrl, base64 } = await this.pdfService.generateRankingPDF(
        data,
        titulo,
        encabezados,
      );

      // Devuelve el path y el base64
      return {
        message: 'PDF generado exitosamente',
        pathUrl,
        pdfBase64: base64,
      };
    } catch (error) {
      console.error('Error al generar el PDF:', error.message);
      throw new HttpException(
        {
          message: 'Error al generar el PDF',
          details: error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
