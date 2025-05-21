import { Module } from '@nestjs/common';
import { PdfService } from '../services/pdf.service';
import { PdfController } from '../controllers/pdf.controller';
import { EventosService } from '../services/eventos.service';

@Module({
  controllers: [PdfController],
  providers: [PdfService, EventosService], // Asegúrate de incluir EventosService si lo usas
  exports: [PdfService], // Exporta PdfService si lo necesitas en otros módulos
})
export class PdfModule {}
