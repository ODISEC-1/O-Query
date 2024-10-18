import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { SelectData } from "../redux/features/TablaRegistro/TablaRegistroSlice";
import { useEffect } from "react";
import { DataRegistro } from "../redux/features/TablaRegistro/Thunk/DataRegistro";
import { useForm } from "react-hook-form";
import { exportToExcel } from "../services/ExportExel";
import { Button } from "@mui/material";

function DerivacionHistorico() {

  const rows = useSelector(SelectData)
  const dispatch = useDispatch()
  const {register,watch}=useForm()

  useEffect(()=>{
    dispatch(DataRegistro())
  })

  const formatFechaCorreo = (fechaCorreo) => {
    const separar = fechaCorreo.split('T');
    return separar.join(' ');
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
    { field: 'FechaDesembolso', headerName: 'Fecha Desembolso' } 
];

const HandelExportXLSX=()=>{
   const desdeel= watch('desdeEl')
   const hastaEl= watch('hastaEl')

   if (desdeel && hastaEl) {
    const filterRows = rows.filter((row)=>{
      const fechaCorreo = row.FechaCorreo.split('T');
      const SoloFecha = fechaCorreo[0]
      return SoloFecha >= desdeel && SoloFecha <= hastaEl
    }) 
     exportToExcel(filterRows,'Derivaciones.xlsx')
   }else{
    exportToExcel(rows,'Derivaciones.xlsx')
   }
}

return (  
  <>
  <div>
    <h1 className="text-3xl uppercase font-bold text-center">TABLA DERIVACION HISTORICO</h1>
  </div>
    <h2>Filtros y descargas</h2>
   <div className="flex item-center">
    <section  className='flex items-center flex-wrap'>
     <p>Desde el:</p>
     <input type="date"  name="date"  className=' mb-2 ml-1 mr-1 border border-gray-200 outline-none py-2 px-8 rounded-lg'
          {...register('desdeEl',{required:true})}
          />
     <p>Hasta el:</p>
     <input type="date" name="date"  className=' mb-2 ml-1 mr-1 border border-gray-200 outline-none py-2 px-8 rounded-lg'
          {...register('hastaEl',{required:true})}
          />
    
    </section>
    <Button
        variant="contained"
        onClick={HandelExportXLSX}
        sx={{
          marginBottom: '10px',
          marginLeft:'10px',
          marginRight:'1opx',
          bgcolor: '#0284c7',
          '&:hover': {
            bgcolor: '#0078c1',
          },
        }}
      >
        Descargar en Excel
      </Button>
      
   </div>
  <div>
    <DataGrid
     rows={rows}
     columns={columns}
     initialState={{
       pagination:{
         paginationModel:{page:0, pageSize:10}
        }
      }}
      pageSizeOptions={[5,10]}
      />
      </div>
  </>
);
}
export default DerivacionHistorico;