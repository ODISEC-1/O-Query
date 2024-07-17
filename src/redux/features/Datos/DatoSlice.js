import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
datoDni:[],
  status: 'idle',
  error: null,
};

export const FetchDataByDNI = createAsyncThunk(
  'data/fetchDataByDNI',
  async (dni) => {
    try {
        
        const {data} = await axios.get(`http://localhost:3001/api/Alldata/${dni}`);
        
        console.log(data)
        return data;
        
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
  }
);


const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchDataByDNI.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(FetchDataByDNI.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.datoDni = action.payload
      })
      .addCase(FetchDataByDNI.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
