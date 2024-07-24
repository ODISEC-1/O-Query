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
        const { data } = await fetchDataWithTimeout(`http://localhost:3001/api/Alldata/${dni}`);
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
        const createDeri = await axios.post('http://localhost:3001/api/Derivation', dta);

        const { data, status, statusText, config } = createDeri;
        return { data, status, statusText, config }; 
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    }
  );