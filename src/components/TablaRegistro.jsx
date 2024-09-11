import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { SelectData } from '../redux/features/TablaRegistro/TablaRegistroSlice';
import { DataRegistro } from '../redux/features/TablaRegistro/Thunk/DataRegistro';
import { exportToExcel } from '../services/ExportExel';
import axios from 'axios';
import EditModal from './EditModal';
import { DeleteDerivacion } from '../redux/features/Datos/Thunk/Data';
import DeleteModal from './DeleteModal';

const TablaRegistro = ({ updateTable }) => {
  const dispatch = useDispatch();
  const rows = useSelector(SelectData);
  const [data, setData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenDelete, setModalOpenDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [triggerUpdate, setTriggerUpdate] = useState(false);


  useEffect(() => {
    dispatch(DataRegistro());
  }, [updateTable, dispatch,triggerUpdate]);

  const formatFechaCorreo = (fechaCorreo) => {
    const separar = fechaCorreo.split('T');
    return separar.join(' ');
  };

  const handleButtonClick = async (row) => {
    const { id } = row;
    const { data } = await axios.get(`https://derivationsystem.up.railway.app/api/Derivation/${id}`);
    setData(data);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleButtonClickModalDelete = (row) => {
    setSelectedRow(row);
    setModalOpenDelete(true);
  };

  const onConfirm = async () => {
    const { id } = selectedRow;
    try {
      await dispatch(DeleteDerivacion(id)).unwrap(); 
      setTriggerUpdate((prev) => !prev); 
    } catch (error) {
      console.error('Error eliminando la derivación:', error);
    } finally {
      setModalOpenDelete(false);
    }
  };

  const handleCloseDeleteModal = () => {
    setModalOpenDelete(false);
  };

  const handleExport = () => {
    exportToExcel(rows, 'Derivaciones.xlsx');
  };

  const columns = [
    { field: 'FechaCorreo', headerName: 'Fecha Correo',renderCell: (params) => formatFechaCorreo(params.value)},
    { field: 'DNI', headerName: 'DNI' },
    { field: 'NombreCompleto', headerName: 'Nombre Completo', width: 130 },
    { field: 'Numero', headerName: 'Numero' },
    { field: 'Oferta', headerName: 'Oferta', type: 'number' },
    { field: 'MontoDesembolso', headerName: 'Monto Desembolso', type: 'number' },
    { field: 'JefeZonal', headerName: 'Jefe Zonal' },
    { field: 'Supervisor', headerName: 'Supervisor' },
    { field: 'Asesor', headerName: 'DNI Asesor' },
    { field: 'Agencia', headerName: 'Agencia' },
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
    {
      field: 'Eliminar',
      headerName: 'Eliminar',
      width: 150,
      renderCell: (params) => (
        <Button
          variant='contained'
          color='error'
          size='medium'
          onClick={() => handleButtonClickModalDelete(params.row)}
        >
          Eliminar
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <h1 className="text-2xl font-bold text-center p-4">TABLA DERIVACIONES</h1>
      </div>
      <Button
        variant="contained"
        onClick={handleExport}
        sx={{
          marginBottom: '10px',
          bgcolor: '#0284c7',
          '&:hover': {
            bgcolor: '#0078c1',
          },
        }}
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
      <DeleteModal
        open={modalOpenDelete}
        handleClose={handleCloseDeleteModal}
        onConfirm={onConfirm}
      />
    </div>
  );
};

export default TablaRegistro;
