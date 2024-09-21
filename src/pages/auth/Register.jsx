import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaArchway, FaAddressCard, FaUserTie } from 'react-icons/fa';
import { IoTimeOutline, IoCellular } from 'react-icons/io5';
import { FaMoneyBillTrendUp } from 'react-icons/fa6';
import { GiReceiveMoney } from 'react-icons/gi';
import { GrMapLocation, GrUserManager } from 'react-icons/gr';
import { BsCalendar2Date } from 'react-icons/bs';
import TablaRegistro from '../../components/TablaRegistro';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { CreateDerivation, FetchDataByDNI } from '../../redux/features/Datos/Thunk/Data';
import { FetchAllAgencia, FetchAllJZ, FetchAllSuper } from '../../redux/features/Datos/Thunk/JefeZonal';
import Select from 'react-select';
import { DataRegistro } from '../../redux/features/TablaRegistro/Thunk/DataRegistro';
import LoadingHandler from '../../components/LoadingHandler';

function Register() {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, setValue, control, reset, formState: { errors } } = useForm();
  const dni = watch('dni');
  const dniData = useSelector((state) => state.DataDni);
  const DataJZ = useSelector((stateJZ) => stateJZ.JefeZonal);
  const { status } = dniData;

  const [UpadateTable, SetUpadateTable] = useState(true);

  useEffect(() => {
    dispatch(FetchAllJZ());
    dispatch(FetchAllSuper());
    dispatch(FetchAllAgencia());
  }, [dispatch]);

  useEffect(() => {
    if (dni && dni.length === 8) {
      dispatch(FetchDataByDNI(dni));
    } else {
      reset({ nombre: '', oferta: '', numero: '' });
    }
  }, [dni, dispatch, reset]);

  useEffect(() => {
    if (dniData.datoDni.busqueda) {
      setValue('nombre', dniData.datoDni.busqueda.nombre);
      setValue('oferta', dniData.datoDni.busqueda.oferta);
      setValue('numero', dniData.datoDni.busqueda.numero);
      setValue('verificacion',dniData.datoDni.verificado)
    } else {
      reset({ nombre: '', oferta: '', numero: '' });
    }
  }, [dniData, setValue, reset]);

  const onSubmit = (data) => {
    const EstructuraData={
    nombre: data?.nombre,
    oferta: data?.oferta,
    numero: data?.numero,
    dni: data?.dni,
    agencia: data?.agencia?.value,
    jefeZonal:data?.jefeZonal?.value,
    supervisor: data?.supervisor?.value,
    horaLlegadaCorreo: data?.horaLlegadaCorreo,
    fechaDesembolso:data?.fechaDesembolso,
    montoDesembolso:data?.montoDesembolsar,
    Asesor:String(data?.DNIAsesor)
    }
  
    const promise = dispatch(CreateDerivation(EstructuraData)).unwrap();
    toast.promise(promise, {
      loading: 'Enviando Datos....',
      success: 'Datos enviados con exito!',
      error: 'Error al enviar los datos'
    });
    promise.then(() => {
      reset();
      SetUpadateTable(prev => !prev);
    });
  };
  const EstadoRegistro = () => {
    if (dni && dni.length === 8) {
      if (dniData.datoDni?.verificado) {
        return (
          <span>Ya registrado ✅<br /><sub style={{color:'red'}}>Si desea editarlo busque en la tabla 👇</sub></span>
        );
      } else {
        return <span>No registrado Antes</span>;
      }
    }
    return null; 
  };
  

  const mapOptions = (data, valueKey, labelKey) => data.map((item) => ({ value: item[valueKey], label: item[labelKey] }));

  return (
    <div className="w-full">
      <div className="bg-white p-8 rounded-lg w-full md:w-5/5 lg:w-3/3 mx-auto">
        <div className="mb-10 flex-column items-center justify-center">
          <h1 className="text-3xl uppercase font-bold text-center">Registrar</h1>
          <LoadingHandler status={status} succeeded={null} rejected="No se encontro cliente"/>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2">
              <div className="relative mb-4">
                <FaAddressCard className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg"
                  placeholder="DNI Consulta"
                  name="dni"
                  {...register('dni', { 
                    required: 'DNI es requerido', 
                    minLength: { value: 8, message: 'DNI debe tener 8 dígitos' }, 
                    maxLength: { value: 8, message: 'DNI debe tener 8 dígitos' }, 
                    pattern: { value: /^\d+$/, message: 'Solo se permiten números en el DNI' }
                 })}
                 
                />
                {errors.dni && <span className="text-red-500">{errors.dni.message}</span>}
              </div>
              <div className="relative mb-4">
                <FaArchway className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                <Controller
                  name="agencia"
                  control={control}
                  rules={{ required: 'Agencia es requerido' }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={DataJZ?.datoAgencia ? mapOptions(DataJZ.datoAgencia, 'Id_Agencia', 'Agencia') : []}
                      placeholder="Selecione Agencia"
                      classNamePrefix="react-select"
                    />
                  )}
                />
                {errors.agencia && <span className="text-red-500">{errors.agencia.message}</span>}
              </div>
              <div className="relative mb-4">
                <GrMapLocation className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                <Controller
                  name="jefeZonal"
                  control={control}
                  rules={{ required: 'Jefe Zonal es requerido' }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={mapOptions(DataJZ.datoJZ, 'id_JZ', 'Nombre_JZ')}
                      placeholder="Selecione Jefe Zonal"
                      classNamePrefix="react-select"
                    />
                  )}
                />
                {errors.jefeZonal && <span className="text-red-500">{errors.jefeZonal.message}</span>}
              </div>
              <div className="relative mb-4">
                <GrUserManager className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                <Controller
                  name="supervisor"
                  control={control}
                  rules={{ required: 'Supervisor es requerido' }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={mapOptions(DataJZ.datoSuper, 'id_Super', 'Nombre_Super')}
                      placeholder="Selecione Supervisor"
                      classNamePrefix="react-select"
                    />
                  )}
                />
                {errors.supervisor && <span className="text-red-500">{errors.supervisor.message}</span>}
              </div>
              <div className="relative mb-4">
                <IoTimeOutline className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="datetime-local"
                  className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg"
                  placeholder="Hora de llegada del correo"
                  {...register('horaLlegadaCorreo', { required: 'Hora de llegada del correo es requerido' })}
                />
                {errors.horaLlegadaCorreo && <span className="text-red-500">{errors.horaLlegadaCorreo.message}</span>}
              </div>
              <div className="relative mb-4">
                <BsCalendar2Date className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="date"
                  className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg"
                  placeholder="Fecha de Desembolso"
                  {...register('fechaDesembolso', { required: 'Fecha de desembolso es requerido' })}
                />
                {errors.fechaDesembolso && <span className="text-red-500">{errors.fechaDesembolso.message}</span>}
              </div>
            </div>
            <div className="w-full md:w-1/2 px-2">
              <div className="relative mb-4">
                <FaUserTie className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  disabled={true}
                  className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg"
                  placeholder="nombre"
                  {...register('nombre', { required: 'nombre es requerida' })}
                />
                {errors.nombre && <span className="text-red-500">{errors.nombre.message}</span>}
              </div>
              <div className="relative mb-4">
                <FaMoneyBillTrendUp className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="number"
                  disabled={dniData?.datoDni?.busqueda?.oferta ? true : false}
                  className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg"
                  placeholder="Oferta"
                  {...register('oferta', { required: 'oferta es requerido' })}
                />
                {errors.oferta && <span className="text-red-500">{errors.oferta.message}</span>}
              </div>
              <div className="relative mb-4">
                <GiReceiveMoney className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="number"
                  className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg"
                  placeholder="Monto a Desembolsar"
                  {...register('montoDesembolsar', { required: 'Monto a desembolsar es requerido' })}
                />
                {errors.montoDesembolsar && <span className="text-red-500">{errors.montoDesembolsar.message}</span>}
              </div>
              <div className="relative mb-4">
                <IoCellular className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg"
                  placeholder="Número"
                  {...register('numero', { required: 'Número es requerido' })}
                />
                {errors.numero && <span className="text-red-500">{errors.numero.message}</span>}
              </div>
              <div className="relative mb-4">
              <FaAddressCard className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="number"
                  className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg"
                  placeholder="DNIAsesor"
                  {...register('DNIAsesor', {
                    required: 'DNI Asesor es requerido',
                    pattern: {
                      value: /^\d{8}$/,
                      message: 'El DNI debe contener exactamente 8 dígitos'
                    }
                  })}
                />
                {errors.DNIAsesor && <span className="text-red-500">{errors.DNIAsesor.message}</span>}
              </div>
          <div className="mt-4">
            <button
              type="submit"
              className=" w-full bg-sky-600 hover:bg-sky-800 text-white py-2 rounded-lg transition duration-200"
            >
              Enviar
            </button>
          </div>
            </div>
          </div>
        </form>
        {EstadoRegistro()}
      </div>
      <div className="flex justify-center">
        <TablaRegistro updateTable={UpadateTable} />
      </div>
    </div>
  );
}

export default Register;
