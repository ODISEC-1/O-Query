import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import moment from 'moment';

export const exportToExcel = (data, fileName = 'derivaciones.xlsx') => {

  const structuredData = data.map(item => ({
    ...item,
    DNI: String(item.DNI),
    NombreCompleto: String(item.NombreCompleto),
    Numero: Number(item.Numero),
    Oferta: Number(item.Oferta),
    MontoDesembolso: Number(item.MontoDesembolso), 
    JefeZonal: String(item.JefeZonal),
    Supervisor: String(item.Supervisor),
    Asesor: String(item.Asesor),
    FechaCorreo: moment(item.FechaCorreo).format('DD-MM-YYYY HH:mm:ss'), 
    FechaDesembolso: moment(item.FechaDesembolso).toDate() 
  }));

  const worksheet = XLSX.utils.json_to_sheet(structuredData);

  
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

 
  const rangeAse = XLSX.utils.decode_range(worksheet['!ref']);
  for (let C = rangeAse.s.c; C <= rangeAse.e.c; ++C) {
    const cellAddress = XLSX.utils.encode_cell({ c: C, r: 0 });
    if (worksheet[cellAddress].v === 'Asesor') {
      for (let R = rangeAse.s.r + 1; R <= rangeAse.e.r; ++R) {
        const cell = worksheet[XLSX.utils.encode_cell({ c: C, r: R })];
        if (cell) {
          cell.z = '@'; 
        }
      }
    }
  }

  const rangeFecha = XLSX.utils.decode_range(worksheet['!ref']);
  for (let C = rangeFecha.s.c; C <= rangeFecha.e.c; ++C) {
    const cellAddress = XLSX.utils.encode_cell({ c: C, r: 0 });
    if (worksheet[cellAddress].v === 'FechaDesembolso') {
      for (let R = rangeFecha.s.r + 1; R <= rangeFecha.e.r; ++R) {
        const cell = worksheet[XLSX.utils.encode_cell({ c: C, r: R })];
        if (cell) {
          cell.z = 'DD/MM/YYYY'; 
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
