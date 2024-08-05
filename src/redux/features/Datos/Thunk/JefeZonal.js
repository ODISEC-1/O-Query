import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchAllJZ = createAsyncThunk('JefeZonal/FetchAllJZ', 
    async()=>{
        try {
            const {data} = await axios.get('https://apirena-production.up.railway.app/api/JefesZonales')
            console.log(data)
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
)

export const FetchAllSuper = createAsyncThunk('Supervisor/FetchAllSuper',async()=>{
    try {
        const {data} = await axios.get('https://apirena-production.up.railway.app/api/Supervisores')
        console.log(data)
        return data
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
})

export const FetchAllAgencia = createAsyncThunk('Agencia/FetchAllAgencia',async()=>{
  try {
    const {data} = await axios.get('https://apirena-production.up.railway.app/api/Agencia')
    console.log(data)
    return data
  } catch (error) {
    console.error('Error fetching data:', error);
        throw error;
  }
})









