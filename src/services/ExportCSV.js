import { saveAs } from 'file-saver';

export const exportToCSV = (data, filename = 'Derivaciones.csv') => {

  const dataDNI = data.map(item => ({
    DNI: item.DNI
  }));

 
  let csvContent = '';  

  dataDNI.forEach(item => {
    csvContent += `${item.DNI}\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  saveAs(blob, filename);
};
