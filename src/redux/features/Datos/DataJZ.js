import { createSlice } from "@reduxjs/toolkit";
import { FetchAllAgencia, FetchAllJZ, FetchAllSuper } from "./Thunk/JefeZonal";

const initialState = {
  datoJZ: [],
  datoSuper:[],
  datoAgencia:[],
  status: 'idle',
  error: null,
};

const DataSliceJZ = createSlice({
  name: 'JefeZonal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    //! JEFE ZONAL
      .addCase(FetchAllJZ.pending, (state) => {
        state.status
         = 'loading';
      })
      .addCase(FetchAllJZ.fulfilled, (state, action) => {
        state.status
         = 'succeeded';
        state.datoJZ = action.payload;
      })
      .addCase(FetchAllJZ.rejected, (state, action) => {
        state.status
         = 'failed';
        state.error = action.error.message;
        state.datoJZ = [];
      })
      //! SUPERVISOR
      .addCase(FetchAllSuper.pending, (state) => {
        state.status
         = 'loading';
      })
      .addCase(FetchAllSuper.fulfilled, (state, action) => {
        state.status
         = 'succeeded';
        state.datoSuper = action.payload;
      })
      .addCase(FetchAllSuper.rejected, (state, action) => {
        state.status
         = 'failed';
        state.error = action.error.message;
        state.datoSuper = [];
      })
      //! AGENCIA
      .addCase(FetchAllAgencia.pending, (state) => {
        state.status
         = 'loading';
      })
      .addCase(FetchAllAgencia.fulfilled, (state, action) => {
        state.status
         = 'succeeded';
        state.datoAgencia= action.payload;
      })
      .addCase(FetchAllAgencia.rejected, (state, action) => {
        state.status
         = 'failed';
        state.error = action.error.message;
        state.datoAgencia= [];
      })
  },
});

export default DataSliceJZ.reducer;
