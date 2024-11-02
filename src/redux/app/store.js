import { configureStore } from "@reduxjs/toolkit";
import TablaRegistroReducer from '../features/TablaRegistro/TablaRegistroSlice'
import dataReducer  from "../features/Datos/DatoSlice";
import DataSliceJZ from "../features/Datos/DataJZ"
import AuthLogin from "../features/Login/LoginSlice"

export default configureStore({
    reducer:{
      TablaRegistro:TablaRegistroReducer,
      DataDni: dataReducer,
      JefeZonal:DataSliceJZ,
      AuthLogin:AuthLogin
    }
});