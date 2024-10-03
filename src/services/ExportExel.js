import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import moment from 'moment';

export const exportToExcel = (data, fileName = 'derivaciones.xlsx') => {
  // Estructurar los datos y formatear las fechas
  const structuredData = data.map(item => ({
    JefeZonal: String(item.JefeZonal),
    FechaCorreo: moment(item.FechaCorreo).format('DD/MM/YY hh:mm'), 
    Asesor: String(item.Asesor),
    Supervisor: String(item.Supervisor),
    FechaDesembolso: moment(item.FechaDesembolso).format('DD/MM/YY'), 
    Agencia: String(item.Agencia),
    DNI: String(item.DNI),
    NombreCompleto: String(item.NombreCompleto),
    Oferta: Number(item.Oferta),
    Blanco_1: String(''),
    Blanco_2: String(''),
    Numero: Number(item.Numero),
  }));

  // Crear hoja de trabajo desde JSON
  const worksheet = XLSX.utils.json_to_sheet(structuredData);

  // Aplicar formato a las columnas específicas
  const range = XLSX.utils.decode_range(worksheet['!ref']);
  

  for (let C = range.s.c; C <= range.e.c; ++C) {
    const cellAddress = XLSX.utils.encode_cell({ c: C, r: 0 });
    if (worksheet[cellAddress].v === 'DNI') {
      for (let R = range.s.r + 1; R <= range.e.r; ++R) {
        const cell = worksheet[XLSX.utils.encode_cell({ c: C, r: R })];
        if (cell) {
          cell.z = '@'; 
        }
      }
    }
  }




  for (let C = range.s.c; C <= range.e.c; ++C) {
    const cellAddress = XLSX.utils.encode_cell({ c: C, r: 0 });
    if (worksheet[cellAddress].v === 'FechaCorreo') {
      for (let R = range.s.r + 1; R <= range.e.r; ++R) {
        const cell = worksheet[XLSX.utils.encode_cell({ c: C, r: R })];
        if (cell) {
          cell.z = 'DD/MM/YY hh:mm'; // Formato personalizado
        }
      }
    }
  }

  for (let C = range.s.c; C <= range.e.c; ++C) {
    const cellAddress = XLSX.utils.encode_cell({ c: C, r: 0 });
    if (worksheet[cellAddress].v === 'FechaDesembolso') {
      for (let R = range.s.r + 1; R <= range.e.r; ++R) {
        const cell = worksheet[XLSX.utils.encode_cell({ c: C, r: R })];
        if (cell) {
          cell.z = 'DD/MM/YY'; // Formato de fecha completo
        }
      }
    }
  }

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Derivaciones');


  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

  saveAs(blob, fileName);
};
