import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setData, SelectData } from '../redux/features/TablaRegistro/TablaRegistroSlice';

const headlenButtonClick = (row) => {
  const { id } = row;
  console.log(`Boton clickeando para la fila: `, id);
};

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'DNI', headerName: 'DNI' },
  { field: 'NombreCompleto', headerName: 'Nombre Completo', width: 130 },
  { field: 'Numero', headerName: 'Numero' },
  { field: 'Oferta', headerName: 'Oferta', type: 'number' },
  { field: 'MontoDesembolso', headerName: 'Monto Desembolso', type: 'number' },
  { field: 'JefeZonal', headerName: 'Jefe Zonal' },
  { field: 'Supervisor', headerName: 'Supervisor' },
  { field: 'Asesor', headerName: 'DNI Asesor' },
  { field: 'Agencia', headerName: 'Agencia' },
  { field: 'FechaCorreo', headerName: 'Fecha Correo' },
  { field: 'FechaDesembolso', headerName: 'Fecha Desembolso' },
  {
    field: 'Editar',
    headerName: 'Editar',
    width: 150,
    renderCell: (params) => (
      <Button
        variant='contained'
        color='primary'
        size='medium'
        onClick={() => headlenButtonClick(params.row)}
      >
        Editar
      </Button>
    ),
  },
];

function TablaRegistro() {
  const dispatch = useDispatch();
  const rows = useSelector(SelectData);

  useEffect(() => {

    console.log(rows);
  }, [dispatch, rows]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}

export default TablaRegistro;
