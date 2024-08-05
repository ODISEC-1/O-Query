import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { SelectData } from '../redux/features/TablaRegistro/TablaRegistroSlice';
import { DataRegistro } from '../redux/features/TablaRegistro/Thunk/DataRegistro';
import { exportToExcel } from '../services/ExportExel';
import axios from 'axios';
import EditModal from './EditModal';
import { OneDerivation } from '../redux/features/Datos/Thunk/Data';

const TablaRegistro = ({ update }) => {
  const dispatch = useDispatch();
  const rows = useSelector(SelectData);
  const [data, setData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(DataRegistro());
  }, [update, dispatch]);

  const handleButtonClick = async (row) => {
    const { id } = row;
    const { data } = await axios.get(`https://apirena-production.up.railway.app/Derivation/${id}`);
    setData(data);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };



  const handleExport = () => {
    exportToExcel(rows, 'Derivaciones.xlsx');
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
          onClick={() => handleButtonClick(params.row)}
        >
          Editar
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>TABLA DERIVACIONES</h1>
      </div>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleExport}
        style={{ marginBottom: '10px' }}
      >
        Descargar en Excel
      </Button>
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
      {data && (
        <EditModal
          open={modalOpen}
          handleClose={handleClose}
          data={data}
        />
      )}
    </div>
  );
};

export default TablaRegistro;
