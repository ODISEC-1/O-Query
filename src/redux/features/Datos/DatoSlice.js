import { createSlice} from '@reduxjs/toolkit';
import { FetchDataByDNI } from './Thunk/Data';


const initialState = {
  datoDni: [],
  status: 'idle',
  error: null,

};


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
