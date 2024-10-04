import pkg from 'file-saver';
import { stringify } from 'csv';


const { saveAs } = pkg;

export const exportToCSV = (data, fileName='DDER.csv') => {
  console.log(data);
  
  // Solo extraemos el campo 'DNI' de cada registro en la tabla
  const estructura = data.map(item => ({
    DNI: String(item?.DNI)
  }));

  const csvOptions = {
    header: true,
    columns: {
      DNI: 'DNI'  // Nombre de la cabecera de la columna en el CSV
    }
  };

  // Convertimos los datos a CSV y los descargamos
  stringify(estructura, csvOptions, (err, csvString) => {
    if (err) {
      console.error(`Error: ${err}`);
      return;
    }

    // Crear el archivo CSV y descargarlo
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, fileName);
  });
};