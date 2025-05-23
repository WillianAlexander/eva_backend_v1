/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
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
    titulo: string,
    encabezados: string[],
    pathUrl = './ranking.pdf',
  ): Promise<{ pathUrl: string; base64: string }> {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });

    console.log(`process.cwd(): ${process.cwd()}`);
    // Agrega la fuente NotoColorEmoji-Regular.ttf
    // const emojiFontPath = 'src/assets/fonts/noto/NotoColorEmoji-Regular.ttf';
    // const emojiFontPath = path.resolve(
    //   process.cwd(),
    //   'src/assets/fonts/noto/NotoColorEmoji-Regular.ttf',
    // );
    const emojiFontPath =
      '/app/dist/assets/fonts/noto/NotoColorEmoji-Regular.ttf';

    // Verifica si el archivo existe
    if (!fs.existsSync(emojiFontPath)) {
      throw new Error(
        `El archivo de fuente no se encuentra en la ruta: ${emojiFontPath}`,
      );
    }

    const emojiFont = fs.readFileSync(emojiFontPath, 'base64');
    doc.addFileToVFS('NotoColorEmoji-Regular.ttf', emojiFont);
    doc.addFont('NotoColorEmoji-Regular.ttf', 'NotoEmoji', 'normal');
    // doc.setFont('NotoEmoji');

    // Agrega otra fuente, por ejemplo, Century Gothic
    const centuryGothicFontPath = '/app/dist/assets/fonts/century/CenturyGothic.ttf';
    const centuryGothicFont = fs.readFileSync(centuryGothicFontPath, 'base64');
    doc.addFileToVFS('CenturyGothic.ttf', centuryGothicFont);
    doc.addFont('CenturyGothic.ttf', 'CenturyGothic', 'normal');

    // Agrega otra fuente, por ejemplo, Century Gothic Bold
    const centuryGothicBoldPath =
      '/app/dist/assets/fonts/century/century-gothic-bold.ttf';
    const centuryGothicBold = fs.readFileSync(centuryGothicBoldPath, 'base64');
    doc.addFileToVFS('century-gothic-bold.ttf', centuryGothicBold);
    doc.addFont('century-gothic-bold.ttf', 'CenturyGothicBold', 'normal');

    // Título
    doc.setFont('CenturyGothicBold');
    doc.setFontSize(15);
    doc.text(titulo, doc.internal.pageSize.getWidth() / 2, 40, {
      align: 'center',
    });

    // Funciones para determinar el rango de las posiciones
    const isPosicionActualEnTop5 = (posicion: string) => {
      const pos = parseInt(posicion, 10);
      return pos >= 1 && pos <= 5;
    };

    const isPosicionActualEnTop12 = (posicion: string) => {
      const pos = parseInt(posicion, 10);
      return pos >= 6 && pos <= 12;
    };

    const isPosicionActualEnTop16 = (posicion: string) => {
      const pos = parseInt(posicion, 10);
      return pos >= 13;
    };

    // Construye los datos de la tabla con estilos condicionales
    const tableBody = data.map((row) => [
      {
        content: row.posicion_anterior == 0 ? '' : row.posicion_anterior,
        styles: isPosicionActualEnTop5(row.posicion_anterior)
          ? { fillColor: [0, 142, 60] } // Verde para Top 5
          : isPosicionActualEnTop12(row.posicion_anterior)
            ? { fillColor: [255, 165, 0] } // Amarillo para Top 6-12
            : isPosicionActualEnTop16(row.posicion_anterior)
              ? { fillColor: [255, 0, 0] } // Rojo para Top 13+
              : {},
      },
      {
        content: row.posicion_actual == 0 ? '' : row.posicion_actual,
        styles: isPosicionActualEnTop5(row.posicion_actual)
          ? { fillColor: [0, 142, 60] } // Verde para Top 5
          : isPosicionActualEnTop12(row.posicion_actual)
            ? { fillColor: [255, 165, 0] } // Amarillo para Top 6-12
            : isPosicionActualEnTop16(row.posicion_actual)
              ? { fillColor: [255, 0, 0] } // Rojo para Top 13+
              : {},
      },
      row.evaluado_id, // Columna sin estilos
    ]);

    autoTable(doc, {
      head: [encabezados],
      body: tableBody,
      startY: 60,
      styles: {
        halign: 'center', // Centrado horizontal
        valign: 'middle', // Centrado vertical
        font: 'CenturyGothic',
        fontSize: 11,
        cellPadding: 5,
      },
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: 20,
        fontStyle: 'normal',
        font: 'CenturyGothicBold', // Cambia la fuente a Century Gothic
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
        2: { cellWidth: 'auto', halign: 'left', fillColor: [255, 255, 255] },
      },
      rowPageBreak: 'avoid',
      tableLineWidth: 0.5,
      tableLineColor: [0, 0, 0],
      didDrawCell: (data) => {
        const { column, row, table } = data;
        const cell = data.cell;

        // Dibuja líneas horizontales grises
        if (row.index < table.body.length - 1) {
          doc.setDrawColor(191, 191, 191); // Gris
          doc.setLineWidth(0.5);
          doc.line(
            cell.x,
            cell.y + cell.height,
            cell.x + cell.width,
            cell.y + cell.height,
          );
        }

        // Dibuja líneas verticales negras
        if (column.index < table.columns.length - 1) {
          doc.setDrawColor(0, 0, 0); // Negro
          doc.setLineWidth(0.5);
          doc.line(
            cell.x + cell.width,
            cell.y,
            cell.x + cell.width,
            cell.y + cell.height,
          );
        }
      },
    });

    // Guarda el PDF en el sistema de archivos
    const pdfBuffer = doc.output('arraybuffer');
    fs.writeFileSync(pathUrl, Buffer.from(pdfBuffer));

    // Devuelve el base64
    const pdfBase64 = Buffer.from(pdfBuffer).toString('base64');
    return { pathUrl, base64: pdfBase64 };
  }
}
