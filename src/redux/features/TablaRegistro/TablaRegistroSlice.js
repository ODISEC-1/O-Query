import { createSlice } from "@reduxjs/toolkit";
import { DataHistoricos, DataRegistro } from "./Thunk/DataRegistro";

const TablaRegistroSlice = createSlice({
  name: 'TablaRegistro',
  initialState: {
    data: [],
    dataHistorico:[],
    statusHistorico:'idle',
    errorHistorico:null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(DataRegistro.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(DataRegistro.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(DataRegistro.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.data = [];
      })
      .addCase(DataHistoricos.pending,(state)=>{
        state.statusHistorico='loading';
      })
      .addCase(DataHistoricos.fulfilled,(state,action)=>{
        state.statusHistorico = 'succeeded';
        state.dataHistorico = action.payload;
      })
      .addCase(DataHistoricos.rejected,(state, action)=>{
        state.statusHistorico = 'failed';
        state.errorHistorico = action.error.message;
        state.dataHistorico = []
      })
  }
});

export const SelectData = (state) => state.TablaRegistro.data;

export const SelectDataHistorico = (state) => state.TablaRegistro.dataHistorico

export default TablaRegistroSlice.reducer;
