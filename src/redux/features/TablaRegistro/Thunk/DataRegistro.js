import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const DataRegistro = createAsyncThunk('Registro/DataRegistro', async () => {
  try {
    const { data } = await axios.get('https://api-rena.onrender.com/api/Derivation');
    const transformedData = data.map(item => {
    const datos ={
      id: item.Id_registro,  
      DNI: item.DNI_Cli,
      NombreCompleto: item.Nombres,
      Numero: item.numero,
      Oferta: item.oferta,
      MontoDesembolso: item.montoDesem,
      JefeZonal: item.JZtable ? item.JZtable.Nombre_JZ : 'N/A',
      Supervisor: item.supervisorTable ? item.supervisorTable.Nombre_Super : 'N/A',
      Asesor: item.DniAsesor,
      Agencia: item.Tabla_Agencium ? item.Tabla_Agencium.Agencia : 'N/A',
      FechaCorreo: item.FechaGestion.split('.').shift(),
      FechaDesembolso: item.FechaDesem.split('T').shift()
    }
    return datos
});
    return transformedData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
});

export const DataHistoricos = createAsyncThunk('Registo/DataHistoricos',async () => {
  
    try {
      const {data} = await axios.get('https://api-rena.onrender.com/api/DerivationHistory');
      const transformedData = data.map(item => {
        const datos={
          id: item.Id_Registro_Deri,  
          DNI: item.DNI_Cli,
          NombreCompleto: item.Nombres,
          Numero: item.Numero,
          Oferta: item.Oferta,
          MontoDesembolso: item.MontoDesem,
          JefeZonal: item.Nombre_JZ,
          Supervisor: item.Nombre_Super,
          Asesor: item.DniAsesor,
          Agencia: item.Agencia,
          FechaCorreo: item.FechaGestion.split('.').shift(),
          FechaDesembolso: item.FechaDesem.split('T').shift()
        }
        return datos
      })
      return transformedData;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
}) 



