import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  datoDni: [],
  status: 'idle',
  error: null,
};

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

export const CreateDerivation =  createAsyncThunk('data/CreateDerivation',async(dta)=>{
    try {
        const createDeri = await axios.post('http://localhost:3001/api/Derivation',dta)
        return createDeri
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
})



const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    clearData(state) {
      state.datoDni = [];
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchDataByDNI.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(FetchDataByDNI.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.datoDni = action.payload;
      })
      .addCase(FetchDataByDNI.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.datoDni = []; 
      });
  },
});

export const { clearData } = dataSlice.actions;
export default dataSlice.reducer;
