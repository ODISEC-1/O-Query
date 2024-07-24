import { createSlice } from "@reduxjs/toolkit";
import { DataRegistro } from "./Thunk/DataRegistro";

const TablaRegistroSlice = createSlice({
  name: 'TablaRegistro',
  initialState: {
    data: [],
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
      });
  }
});

export const SelectData = (state) => state.TablaRegistro.data;

export default TablaRegistroSlice.reducer;
