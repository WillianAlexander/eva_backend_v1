/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// src/pdf/pdf.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable()
export class PdfService {
  async generateRankingPDF(
    data: any[],
    pathUrl = './ranking.pdf',
  ): Promise<{ pathUrl: string; base64: string }> {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });

    // Título
    doc.setFontSize(18);
    doc.text(
      'Ranking Departamental',
      doc.internal.pageSize.getWidth() / 2,
      40,
      { align: 'center' },
    );

    // Construye los datos de la tabla
    const tableBody = data.map((row) => [
      row.posicion_anterior,
      row.posicion_actual,
      row.evaluado_id,
    ]);

    autoTable(doc, {
      head: [
        ['RANKING \nFEBRERO \n2025', 'RANKING \nMARZO \n2025', 'DEPARTAMENTO'],
      ],
      body: tableBody,
      startY: 60,
      styles: {
        halign: 'center', // Centrado horizontal
        valign: 'middle', // Centrado vertical
        font: 'helvetica',
        fontSize: 11,
        cellPadding: 10,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold',
        halign: 'center',
        valign: 'middle',
      },
      bodyStyles: {
        fillColor: [255, 255, 255], // Fondo blanco para el body
        textColor: 20, // Texto oscuro
        fontSize: 10,
        fontStyle: 'normal',
        halign: 'center',
        valign: 'middle',
      },
      columnStyles: {
        0: { cellWidth: 'auto' },
        1: { cellWidth: 'auto' },
        2: { cellWidth: 'auto', halign: 'left' },
      },
      rowPageBreak: 'avoid',
      tableLineWidth: 0.5,
      tableLineColor: [0, 0, 0],
    });

    // Guarda el PDF en el sistema de archivos
    const pdfBuffer = doc.output('arraybuffer');
    fs.writeFileSync(pathUrl, Buffer.from(pdfBuffer));

    // Devuelve el base64
    const pdfBase64 = Buffer.from(pdfBuffer).toString('base64');
    return { pathUrl, base64: pdfBase64 };
  }
}
