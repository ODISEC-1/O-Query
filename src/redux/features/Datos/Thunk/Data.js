import {createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const fetchDataWithTimeout = (url, timeout = 5000) => {
    return Promise.race([
      axios.get(url),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), timeout)
      )
    ]);
  };

export const FetchDataByDNI = createAsyncThunk(
    'data/fetchDataByDNI',
    async (dni) => {
      try {
        const { data } = await fetchDataWithTimeout(`https://apirena-production.up.railway.app/api/Alldata/${dni}`);
        console.log(data);
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    }
  );


  export const CreateDerivation = createAsyncThunk(
    'data/CreateDerivation',
    async (dta, thunkAPI) => {
      try {
        const createDeri = await axios.post('https://apirena-production.up.railway.app/api/Derivation', dta);

        const { data, status, statusText, config } = createDeri;
        return { data, status, statusText, config }; 
      } catch (error) {
        console.error('Error post data:', error);
        throw error;
      }
    }
  );


  export const UpdateDerivacion = createAsyncThunk('data/UpdateDerivacion',
   async(dataUpdate,thunkAPI)=>{
    try {
      const Update = await axios.put(`https://apirena-production.up.railway.app/api/Derivation/${dataUpdate.id}`, dataUpdate)
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
      const {data} = await axios.get(`https://apirena-production.up.railway.app/api/Derivation/${id}`)
      console.log(data) 
      return data
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  })