import {createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';




export const FetchDataByDNI = createAsyncThunk(
  'data/fetchDataByDNI',
  async (dni, { rejectWithValue }) => {
    try {
      const { data,status } = await axios.get(`https://api-rena-1.onrender.com/api/Alldata/${dni}`);
      if (data) {
      return data;
      }
      
    } catch (error) {
      if (error.response && error.response.status === 404) {

        return rejectWithValue('No se encontraron datos para el DNI proporcionado');
      } else if (error.message === 'Request timed out') {

        return rejectWithValue('La solicitud ha superado el tiempo de espera');
      } else {

        console.error('Error fetching data:', error);
        return rejectWithValue('Hubo un error al obtener los datos');
      }
    }
  }
);


  export const CreateDerivation = createAsyncThunk(
    'data/CreateDerivation',
    async (dta, thunkAPI) => {
      try {
        const createDeri = await axios.post('https://api-rena-1.onrender.com/api/Derivation', dta);

        const { data, status, statusText, config } = createDeri;
        return { data, status, statusText, config }; 
      } catch (error) {
        console.error('Error post data:', error);
        throw error;
      }
    }
  );


export const CreateDerivationPHP = createAsyncThunk('data/CreateDerivationPHP',
  async (dni,thunkAPI)=>{
    try {
      const createDeriPHP= await axios.post('https://api-rena-1.onrender.com/api/DerivacionPHP',dni)
      return createDeriPHP.data;
    } catch (error) {
      console.error('Error post data:', error);
      throw error;  
    }
  }

)

  export const UpdateDerivacion = createAsyncThunk('data/UpdateDerivacion',
   async(dataUpdate,thunkAPI)=>{

    try {
      const Update = await axios.put(`https://api-rena-1.onrender.com/api/Derivation/${dataUpdate.id}`, dataUpdate)
     const {data,status,statusText} = Update;
     return {data,status,statusText}
    } catch (error) {
      console.error('Error update data:', error);
      throw error;
    }
   }
  )



  export const OneDerivation =createAsyncThunk('data/UpdateDerivacion',async(id)=>{
    try {
      const {data} = await axios.get(`https://api-rena-1.onrender.com/api/Derivation/${id}`)
      return data
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  })


  export const DeleteDerivacion = createAsyncThunk(
    'data/DeleteDerivacion',
    async (id) => {
      try {
        const response = await axios.delete(`https://api-rena-1.onrender.com/api/Derivation/${id}`);
        return response.data;
      } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
      }
    }
  );