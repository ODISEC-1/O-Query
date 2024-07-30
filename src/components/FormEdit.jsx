import { Select, MenuItem, TextField, Button } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const FormEdit = ({ data }) => {
  const dispatch = useDispatch();
  const { datoJZ, datoSuper, datoAgencia } = useSelector((state) => state.JefeZonal);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      DNI_Cli: data.DNI_Cli,
      Nombres: data.Nombres,
      oferta: data.oferta,
      montoDesem: data.montoDesem,
      numero: data.numero,
      agencia: data.agencia,
      jefeZonal: data.jefeZonal,
      supervisor: data.supervisor,
      DniAsesor: data.DniAsesor,
      FechaGestion: data.FechaGestion,
      FechaDesem: data.FechaDesem,
      FechaRegistro: data.FechaRegistro,
      Id_Usuario: data.Id_Usuario,
      FechaModificaion: data.FechaModificaion,
      Id_Modificador: data.Id_Modificador
    }
  });

  const MapOptions = (data, valueKey, labelKey) => data.map((item) => ({ value: item[valueKey], label: item[labelKey] }));

  const onSubmit = (formData) => {
    const EstructuraData = {
      nombre: formData.Nombres,
      oferta: formData.oferta,
      numero: formData.numero,
      dni: formData.DNI_Cli,
      agencia: formData.agencia,
      jefeZonal: formData.jefeZonal,
      supervisor: formData.supervisor,
      horaLlegadaCorreo: formData.FechaGestion,
      fechaDesembolso: formData.FechaDesem,
      montoDesembolso: formData.montoDesem,
      Asesor: formData.DniAsesor
    };

    console.log(EstructuraData);
   
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="DNI_Cli"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="DNI Cliente" />
        )}
      />
      <Controller
        name="Nombres"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Nombres" />
        )}
      />
      <Controller
        name="oferta"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Oferta" />
        )}
      />
      <Controller
        name="montoDesem"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Monto Desembolsado" />
        )}
      />
      <Controller
        name="numero"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Número" />
        )}
      />
      <Controller
        name="agencia"
        control={control}
        render={({ field }) => (
          <Select {...field} label="Agencia">
            <MenuItem value="" disabled>Seleccione Agencia</MenuItem>
            {MapOptions(datoAgencia, 'Id_Agencia', 'Agencia').map(option => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
        )}
      />
      <Controller
        name="jefeZonal"
        control={control}
        render={({ field }) => (
          <Select {...field} label="Jefe Zonal">
            <MenuItem value="" disabled>Seleccione Jefe Zonal</MenuItem>
            {MapOptions(datoJZ, 'id_JZ', 'Nombre_JZ').map(option => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
        )}
      />
      <Controller
        name="supervisor"
        control={control}
        render={({ field }) => (
          <Select {...field} label="Supervisor">
            <MenuItem value="" disabled>Seleccione Supervisor</MenuItem>
            {MapOptions(datoSuper, 'id_Super', 'Nombre_Super').map(option => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
        )}
      />
      <Controller
        name="DniAsesor"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="DNI Asesor" />
        )}
      />
      <Controller
        name="FechaGestion"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Fecha de Gestión" />
        )}
      />
      <Controller
        name="FechaDesem"
        control={control}
        render={({ field }) => {
          console.log(field)
          return(
         <input type="date" value={field.value}/>
        )}}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default FormEdit;
