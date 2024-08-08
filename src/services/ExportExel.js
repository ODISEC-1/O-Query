import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportToExcel = (data, fileName = 'derivaciones.xlsx') => {
  const structuredData = data.map(item => ({
    ...item,
    DNI: String(item.DNI)
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

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Derivaciones');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  
  saveAs(blob, fileName);
};
