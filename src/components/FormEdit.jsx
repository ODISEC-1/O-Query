import { Select } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const FormEdit = ({ data }) => {
  const dispatch = useDispatch();
  const { datoJZ } = useSelector((state) => state.JefeZonal);


  const { control, handleSubmit } = useForm();

  const MapOptionsJZ = (data, valueKey, labelKey) =>
    data.map((item) => ({ value: item[valueKey], label: item[labelKey] }));
   console.log(data)
  const onSubmit = (formData) => {
    console.log(formData);
    // Aquí puedes despachar alguna acción o manejar el envío del formulario
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" value={data.DNI_Cli} readOnly />
      <Controller
        name="agencia"
        control={control}
        rules={{ required: 'Jefe Zonal es requerido' }}
        render={({ field }) => (
          <Select
            {...field}
            native
            defaultValue={''}
          >
            <option value="" disabled>Seleccione Agencia</option>
            {MapOptionsJZ(datoJZ, 'id_JZ', 'Nombre_JZ').map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </Select>
        )}
      />
        <Controller
        name="JefeZonaL"
        control={control}
        rules={{ required: 'Jefe Zonal es requerido' }}
        render={({ field }) => (
          <Select
            {...field}
            native
        
          >
            <option value={data.Id_JZ} disabled>{data.Nombre_JZ}</option>
            {MapOptionsJZ(datoJZ, 'id_JZ', 'Nombre_JZ').map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </Select>
        )}
      />
        <Controller
        name="agencia"
        control={control}
        rules={{ required: 'Agencia es requerido' }}
        render={({ field }) => (
          <Select
            {...field}
            native
            defaultValue={''}
          >
            <option  disabled>Seleccione Agencia</option>
            {MapOptionsJZ(datoJZ, 'id_JZ', 'Nombre_JZ').map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </Select>
        )}
      />
      <p>{data.DNI_Cli}</p>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormEdit;
