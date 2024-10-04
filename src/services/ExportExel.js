import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import moment from 'moment';

export const exportToExcel = (data, fileName = 'derivaciones.xlsx') => {

  const structuredData = data.map(item => {

    const NombreJefeZonal = () => {
      const dataItem = item.JefeZonal.split(' ');
      if (dataItem[0] === 'ODISEC') {
        return dataItem.join(' ');
      } else if (dataItem.length === 3) {
        return dataItem[0].concat(' ',dataItem[2]);
      } else {
        return dataItem[0].concat(' ',dataItem[2]);
      }
    }

    const ejecutor = NombreJefeZonal(); 

    return {
      JefeZonal: String(ejecutor), 
      FechaCorreo: moment(item.FechaCorreo).format('DD/MM/YY HH:mm'), 
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
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(structuredData);
  const range = XLSX.utils.decode_range(worksheet['!ref']);

  // Consolidar la lógica de formato de columnas
  const formatColumns = ['DNI', 'FechaCorreo', 'FechaDesembolso'];
  const formats = {
    'DNI': '@',
    'FechaCorreo': 'DD/MM/YY HH:mm',
    'FechaDesembolso': 'DD/MM/YY'
  };

  for (let C = range.s.c; C <= range.e.c; ++C) {
    const cellAddress = XLSX.utils.encode_cell({ c: C, r: 0 });
    const header = worksheet[cellAddress]?.v;
    if (formatColumns.includes(header)) {
      for (let R = range.s.r + 1; R <= range.e.r; ++R) {
        const cell = worksheet[XLSX.utils.encode_cell({ c: C, r: R })];
        if (cell) {
          cell.z = formats[header];
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
