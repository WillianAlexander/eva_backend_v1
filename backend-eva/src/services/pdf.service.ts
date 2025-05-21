/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// src/pdf/pdf.service.ts
import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake';
import * as fs from 'fs';
import * as vfsFonts from 'pdfmake/build/vfs_fonts';

@Injectable()
export class PdfService {
  async generateRankingPDF(
    data: any[],
    path = './ranking.pdf',
  ): Promise<{ path: string; base64: string }> {
    // Usa las fuentes predefinidas de vfs_fonts
    const fonts = {
      Roboto: {
        normal: vfsFonts.vfs['Roboto-Regular.ttf'],
        bold: vfsFonts.vfs['Roboto-Medium.ttf'],
        italics: vfsFonts.vfs['Roboto-Italic.ttf'],
        bolditalics: vfsFonts.vfs['Roboto-MediumItalic.ttf'],
      },
    };

    const printer = new PdfPrinter(fonts);

    const tableBody = [
      [
        { text: 'Departamento', bold: true },
        { text: 'Puntaje Actual', bold: true },
        { text: 'Posición Actual', bold: true },
        { text: 'Puntaje Anterior', bold: true },
        { text: 'Posición Anterior', bold: true },
      ],
      ...data.map((row) => [
        row.evaluado_id,
        row.actual,
        row.posicion_actual,
        row.anterior,
        row.posicion_anterior,
      ]),
    ];

    const docDefinition = {
      content: [
        { text: 'Ranking Departamental', style: 'header' },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto', 'auto'],
            body: tableBody,
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10] as [number, number, number, number],
        },
      },
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);

    // Guarda el PDF en el sistema de archivos
    const writeStream = fs.createWriteStream(path);
    pdfDoc.pipe(writeStream);

    // Genera el PDF en memoria para convertirlo a base64
    const chunks: Buffer[] = [];
    return new Promise((resolve, reject) => {
      pdfDoc.on('data', (chunk) => chunks.push(chunk));
      pdfDoc.on('end', () => {
        const pdfBuffer = Buffer.concat(chunks);
        const pdfBase64 = pdfBuffer.toString('base64');

        // Espera a que el archivo se guarde completamente
        writeStream.on('finish', () => {
          resolve({ path, base64: pdfBase64 });
        });

        writeStream.on('error', (error) => reject(error));
      });
      pdfDoc.on('error', (error) => reject(error));
      pdfDoc.end();
    });
  }
}
