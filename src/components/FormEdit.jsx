import { Select, MenuItem, TextField, Button, Box, Typography } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { UpdateDerivacion } from "../redux/features/Datos/Thunk/Data";
import toast from "react-hot-toast";
import { DataRegistro } from "../redux/features/TablaRegistro/Thunk/DataRegistro";

const FormEdit = ({ data, close }) => {
  const dispatch = useDispatch();
  const { datoJZ, datoSuper, datoAgencia } = useSelector((state) => state.JefeZonal);

  const addFiveHours = (dateString) => {
    const date = new Date(dateString);
    date.setHours(date.getHours() + 5);
    return date.toISOString();
  };

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      id: data.Id_registro,
      DNI_Cli: data.DNI_Cli,
      Nombres: data.Nombres,
      oferta: data.oferta,
      montoDesem: data.montoDesem,
      numero: data.numero,
      agencia: data.agencia,
      jefeZonal: data.jefeZonal,
      supervisor: data.supervisor,
      DniAsesor: data.DniAsesor,
      FechaGestion: addFiveHours(data.FechaGestion),
      FechaDesem: data.FechaDesem,
      FechaRegistro: data.FechaRegistro,
      Id_Usuario: data.Id_Usuario,
      FechaModificaion: data.FechaModificaion,
      Id_Modificador: data.Id_Modificador
    }
  });


  const mapOptions = (data, valueKey, labelKey) => {
    return data.map((item) => ({
      value: item[valueKey],
      label: item[labelKey],
    }));
  };


  const onSubmit = (formData) => {
    const EstructuraData = {
      id: formData.id,
      Nombres:formData.Nombres,
      numero: formData.numero,
      agencia: formData.agencia,
      jefeZonal: formData.jefeZonal,
      supervisor: formData.supervisor,
      horaLlegadaCorreo: formData.FechaGestion,
      fechaDesembolso: formData.FechaDesem,
      montoDesembolso: formData.montoDesem,
      Asesor: formData.DniAsesor,
    };

    const promise = dispatch(UpdateDerivacion(EstructuraData));
    toast.promise(promise, {
      loading: 'Enviando Datos...',
      success: 'Datos enviados con éxito!',
      error: 'Error al enviar los datos'
    });

    promise.then(() => {
      close();
      dispatch(DataRegistro());
    });
  };


  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 'bold', color: '#1976d2' }}>
          Detalles del Cliente
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Controller
           name="Nombres"
           control={control}
           rules={{required:'El Nombre es obligatorio'}}
           render={({field})=>(
            <TextField
             {...field}
             label='Nombre cliente'
             variant="outlined"
             fullWidth
             error={!!errors.Nombres}
             helperText={errors.Nombres?.message}
            />
           )}
          
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>ID Registro:</Typography>
          <Typography variant="body2">{data.Id_registro}</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>DNI Cliente:</Typography>
          <Typography variant="body2">{data.DNI_Cli}</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Oferta:</Typography>
          <Typography variant="body2">{data.oferta}</Typography>
        </Box>
      </Box>

      <Controller
        name="montoDesem"
        control={control}
        rules={{ required: 'El Monto de Desembolso es obligatorio' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Monto Desembolsado"
            variant="outlined"
            fullWidth
            error={!!errors.montoDesem}
            helperText={errors.montoDesem?.message}
          />
        )}
      />

      <Controller
        name="numero"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Número"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="agencia"
        control={control}
        rules={{ required: 'La Agencia es obligatoria' }}
        render={({ field }) => (
          <Select
            {...field}
            variant="outlined"
            fullWidth
            error={!!errors.agencia}
            displayEmpty
          >
            <MenuItem value="" disabled>Seleccione Agencia</MenuItem>
            {mapOptions(datoAgencia, 'Id_Agencia', 'Agencia').map(option => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
        )}
      />
      <Controller
        name="jefeZonal"
        control={control}
        rules={{ required: 'El Jefe Zonal es obligatorio' }}
        render={({ field }) => (
          <Select
            {...field}
            variant="outlined"
            fullWidth
            error={!!errors.jefeZonal}
            displayEmpty
          >
            <MenuItem value="" disabled>Seleccione Jefe Zonal</MenuItem>
            {mapOptions(datoJZ, 'id_JZ', 'Nombre_JZ').map(option => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
        )}
      />
      <Controller
        name="supervisor"
        control={control}
        rules={{ required: 'El Supervisor es obligatorio' }}
        render={({ field }) => (
          <Select
            {...field}
            variant="outlined"
            fullWidth
            error={!!errors.supervisor}
            displayEmpty
          >
            <MenuItem value="" disabled>Seleccione Supervisor</MenuItem>
            {mapOptions(datoSuper, 'id_Super', 'Nombre_Super').map(option => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
        )}
      />
      <Controller
        name="DniAsesor"
        control={control}
        rules={{
          required: 'El DNI del Asesor es obligatorio',
          pattern: {
            value: /^\d{8}$/,
            message: 'El DNI debe tener 8 dígitos'
          }
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="DNI Asesor"
            variant="outlined"
            fullWidth
            error={!!errors.DniAsesor}
            helperText={errors.DniAsesor?.message}
          />
        )}
      />
      <Controller
        name="FechaGestion"
        control={control}
        render={({ field }) => {
          const formatDateTime = (dateTime) => {
            if (!dateTime) return "";
            const date = new Date(dateTime);
            date.setHours(date.getHours());
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${year}-${month}-${day}T${hours}:${minutes}`;
          };

          return (
            <input
              type="datetime-local"
              value={formatDateTime(field.value)}
              onChange={(e) => field.onChange(e.target.value)}
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #1976d2', width: '100%' }}
            />
          );
        }}
      />
      <Controller
        name="FechaDesem"
        control={control}
        render={({ field }) => {
          const dateValue = field.value ? new Date(field.value).toISOString().split("T")[0] : "";
          return (
            <input
              type="date"
              value={dateValue}
              onChange={(e) => field.onChange(e.target.value)}
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #1976d2', width: '100%' }}
            />
          );
        }}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
};

export default FormEdit;
