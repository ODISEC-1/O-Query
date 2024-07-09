import { configureStore } from "@reduxjs/toolkit";
import TablaRegistroReducer from '../features/TablaRegistro/TablaRegistroSlice'

export default configureStore({
    reducer:{
      TablaRegistro:TablaRegistroReducer 
    },
});