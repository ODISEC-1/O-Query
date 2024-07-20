import { createSlice } from "@reduxjs/toolkit";




export const TablaRegistroSlice = createSlice({
  name: 'TablaRegistro',
  initialState: {
    data: [
      { id: 1, DNI: '03264894', NombreCompleto: 'Jose Pedro castillo carbajal', Numero: '963258741', Oferta: 18000, MontoDesembolso: 20000, JefeZonal: 'fulano', Supervisor: 'fulano2S',Asesor:'987456321', Agencia: 'Lima', FechaCorreo: '09/07/2024/12:22', FechaDesembolso: '12/07/2024' },
      { id: 1, DNI: '03264894', NombreCompleto: 'Jose Pedro castillo carbajal', Numero: '963258741', Oferta: 18000, MontoDesembolso: 20000, JefeZonal: 'fulano', Supervisor: 'fulano2S',Asesor:'987456321', Agencia: 'Lima', FechaCorreo: '09/07/2024/12:22', FechaDesembolso: '12/07/2024' },{ id: 1, DNI: '03264894', NombreCompleto: 'Jose Pedro castillo carbajal', Numero: '963258741', Oferta: 18000, MontoDesembolso: 20000, JefeZonal: 'fulano', Supervisor: 'fulano2S',Asesor:'987456321', Agencia: 'Lima', FechaCorreo: '09/07/2024/12:22', FechaDesembolso: '12/07/2024' }
    ],

  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },

});

export const { setData } = TablaRegistroSlice.actions;

export const SelectData = (state) => state.TablaRegistro.data;

export default TablaRegistroSlice.reducer;
