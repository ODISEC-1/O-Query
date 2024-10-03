import { DataGrid } from "@mui/x-data-grid";

function EstadoCliente() {

    const rows = [
       {FechaCorreo:"hola"},
       {DNI:"coos"}

    ]

    const columns =[
        { field: 'FechaCorreo', headerName: 'Fecha Correo'},
        { field: 'DNI', headerName: 'DNI' }  
    ]
return (  
  <>
    <h1>TABLA ESTADO DEL CLIENTE </h1>
    <DataGrid
     rows={rows}
     columns={columns}
    initialState={{
        pagination:{
            paginationModel:{page:0, pageSize:5}
        }
    }}
    pageSizeOptions={[5,10]}
    />
  </>
);
}
export default EstadoCliente;