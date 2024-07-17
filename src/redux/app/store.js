import { configureStore } from "@reduxjs/toolkit";
import TablaRegistroReducer from '../features/TablaRegistro/TablaRegistroSlice'
import dataReducer  from "../features/Datos/DatoSlice";

export default configureStore({
    reducer:{
      TablaRegistro:TablaRegistroReducer,
      DataDni: dataReducer
    },
});