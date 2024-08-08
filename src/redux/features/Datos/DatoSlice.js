import { createSlice} from '@reduxjs/toolkit';
import { FetchDataByDNI, UpdateDerivacion } from './Thunk/Data';


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
      state.status = '';
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
        state.loading = 'failed';
        state.datoDni = []
        state.error = 'Hubo un error al obtener los datos';
      });
  },
});

export const { clearData } = dataSlice.actions;
export default dataSlice.reducer;
