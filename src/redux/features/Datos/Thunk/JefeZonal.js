import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchAllJZ = createAsyncThunk('JefeZonal/FetchAllJZ', 
    async()=>{
        try {
            const {data} = await axios.get('https://derivationsystem.up.railway.app/api/JefesZonales')

            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
)

export const FetchAllSuper = createAsyncThunk('Supervisor/FetchAllSuper',async()=>{
    try {
        const {data} = await axios.get('https://derivationsystem.up.railway.app/api/Supervisores')

        return data
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
})

export const FetchAllAgencia = createAsyncThunk('Agencia/FetchAllAgencia',async()=>{
  try {
    const {data} = await axios.get('https://derivationsystem.up.railway.app/api/Agencia')

    return data
  } catch (error) {
    console.error('Error fetching data:', error);
        throw error;
  }
})









