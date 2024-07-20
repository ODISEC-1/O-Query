import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaArchway, FaAddressCard, FaUserTie } from 'react-icons/fa';
import { IoTimeOutline, IoCellular } from 'react-icons/io5';
import { FaMoneyBillTrendUp } from 'react-icons/fa6';
import { GiReceiveMoney } from 'react-icons/gi';
import { GrMapLocation, GrUserManager } from 'react-icons/gr';
import { BsCalendar2Date } from 'react-icons/bs';
import TablaRegistro from '../../components/TablaRegistro';
import { useDispatch, useSelector } from 'react-redux';
import { CreateDerivation, FetchDataByDNI } from '../../redux/features/Datos/DatoSlice';
import Loading from '../../components/Loading';
import {toast} from 'react-hot-toast';

function Register() {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, setValue, control,reset, formState: { errors } } = useForm();
  const dni = watch('dni');
  const dniData = useSelector((state) => state.DataDni);
  const {status} = dniData

  useEffect(() => {
    if (dni && dni.length === 8) {
      dispatch(FetchDataByDNI(dni));
    }else{
       reset({nombre:'',oferta:'',numero:''});
       
    }
  }, [dni, dispatch,reset]);

  useEffect(() => {
    if (dniData.datoDni.busqueda ) {
      setValue('nombre', dniData.datoDni.busqueda.nombre);
      console.log(dniData.datoDni.busqueda.nombre)
      setValue('oferta', dniData.datoDni.busqueda.oferta);
      setValue('numero', dniData.datoDni.busqueda.numero);
    }else{
      reset({nombre:'',oferta:'',numero:''});
    }
  }, [dniData, setValue,reset]);

  useEffect(() => {
    if (dni && dni.length !== 8) {
      reset({ nombre: '', oferta: '' });
    }
  }, [dni, reset]);

  const onSubmit = (data) => {
   const promise = dispatch(CreateDerivation(data)).unwrap();

    toast.promise(
      promise,{
        loading:'Enviando Datos....',
        success:'Datos enviados con exito!',
        error:'Error al enviar los datos'
      }
    )
    promise.then(()=>reset())
  };

  return (
    <div className="w-full">
      <div className="bg-white p-8 rounded-lg w-full md:w-5/5 lg:w-3/3 mx-auto">
        <div className="mb-10 flex-column items-center justify-center">
          <h1 className="text-3xl uppercase font-bold text-center">Registrar</h1>
        { status !== 'loading' ? null: <Loading/> }
        { status !== 'failed' ? null: (<span style={{color:'red'}}>no se encontro cliente</span>)}
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
                  name='dni'
                  {...register('dni', { required: 'DNI es requerido', maxLength: 8, minLength: 8 })}
                />
                {errors.dni && <span className="text-red-500">{errors.dni.message}</span>}
              </div>
              <div className="relative mb-4">
                <GrMapLocation className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg"
                  placeholder="Jefe Zonal"
                  {...register('jefeZonal', { required: 'Jefe Zonal es requerido' })}
                />
                {errors.jefeZonal && <span className="text-red-500">{errors.jefeZonal.message}</span>}
              </div>
              <div className="relative mb-4">
                <GrUserManager className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg"
                  placeholder="Supervisor"
                  {...register('supervisor', { required: 'Supervisor es requerido' })}
                />
                {errors.supervisor && <span className="text-red-500">{errors.supervisor.message}</span>}
              </div>
              <div className="relative mb-4">
                <GrUserManager className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg"
                  placeholder="DNI Asesor"
                  {...register('Asesor', { required: 'Asesor es requerido' })}
                />
                {errors.Asesor && <span className="text-red-500">{errors.Asesor.message}</span>}
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
                  disabled={dniData?.datoDni?.busqueda?.nombre ? true:false}
                  className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg"
                  placeholder="nombre"
                  {...register('nombre', { required: 'nombre es requerida' })}
                />
               
                {errors.nombre && <span className="text-red-500">{errors.nombre.message}</span>}
              </div>
              <div className="relative mb-4">
                <FaMoneyBillTrendUp className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  disabled={dniData?.datoDni?.busqueda?.oferta ? true:false}
                  className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg"
                  placeholder="Oferta"
                  {...register('oferta', { required: 'Oferta es requerida' })}
                />
                {errors.oferta && <span className="text-red-500">{errors.oferta.message}</span>}
              </div>
              <div className="relative mb-4">
                <GiReceiveMoney className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg"
                 
                  placeholder="Monto de Desembolso"
                  {...register('montoDesembolso', { required: 'Monto de desembolso es requerido' })}
                />
                {errors.montoDesembolso && <span className="text-red-500">{errors.montoDesembolso.message}</span>}
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
                <FaArchway className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg"
                  placeholder="Agencia"
                  {...register('agencia', { required: 'Agencia es requerido' })}
                />
                {errors.agencia && <span className="text-red-500">{errors.agencia.message}</span>}
              </div>
              <div>
                <button type="submit" className="bg-sky-600 text-white w-full py-2 px-6 text-center rounded-lg mt-2">
                  GUARDAR →
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <br />
      <TablaRegistro />
    </div>
  );
}

export default Register;
