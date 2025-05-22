/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/pdf/pdf.controller.ts
import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PdfService } from 'src/services/pdf.service';
import { EventosService } from 'src/services/eventos.service';

@Controller('pdf')
export class PdfController {
  constructor(
    private readonly pdfService: PdfService,
    private readonly eventosService: EventosService,
  ) {}

  @Get('ranking/:eventoid')
  async generatePDF(@Param('eventoid') eventoid: number) {
    try {
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
      const { pathUrl, base64 } =
        await this.pdfService.generateRankingPDF(data);

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
