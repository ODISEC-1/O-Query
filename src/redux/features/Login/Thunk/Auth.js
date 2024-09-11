import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const VerifyLogin = createAsyncThunk(
   'auth/login',
   async (credentials, { rejectWithValue }) => {
     try {
       const response = await axios.post('http://localhost:3001/api/Login', credentials);
       const { token, datos,access } = response.data;

       const DT={
        token,
        ...datos,
        access
       }
       console.log(access)
       if (response) {
        if (response.data.access) {
          localStorage.setItem('token', JSON.stringify(DT));
        }else{
          console.log(response.data.message)
          return response.data.message;
        }
       }
       

       return access ;
     } catch (error) {
       if (!error.response) {
         throw error;
       }
       return rejectWithValue(error.response.data);
     }
   }
 )
 

 /*{
    data: { access: false, message: 'Contraseña incorrecta' }*/

