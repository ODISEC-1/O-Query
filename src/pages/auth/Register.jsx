import { useForm } from "react-hook-form";
import { FaArchway, FaAddressCard, FaAddressBook, FaUserTie } from "react-icons/fa";
import { IoTimeOutline, IoCellular } from "react-icons/io5";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import { GrMapLocation, GrUserManager } from "react-icons/gr";
import { BsCalendar2Date } from "react-icons/bs";
import TablaRegistro from "../../components/TablaRegistro";

function Register() {
  const { register, handleSubmit,reset, formState: { errors } } = useForm();
  
  const onSubmit = data => {
    console.log(data);
   reset();
  };

  return (
    <div className="w-full">
    <div className='bg-white p-8 rounded-lg w-full md:w-5/5 lg:w-3/3 mx-auto'>
      <div className='mb-10'>
        <h1 className='text-3xl uppercase font-bold text-center'>Registrar</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2">
            <div className='relative mb-4'>
              <FaAddressCard className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500' />
              <input 
                type="text" 
                className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg"
                placeholder='DNI Consulta'
                {...register("dni", { required: "DNI es requerido" })}
              />
              {errors.dni && <span className="text-red-500">{errors.dni.message}</span>}
            </div>
            <div className='relative mb-4'>
              <GrMapLocation className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500' />
              <input 
                type="text" 
                className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg" 
                placeholder='Jefe Zonal'
                {...register("jefeZonal", { required: "Jefe Zonal es requerido" })}
              />
              {errors.jefeZonal && <span className="text-red-500">{errors.jefeZonal.message}</span>}
            </div>
            <div className='relative mb-4'>
              <GrUserManager className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500' />
              <input 
                type="text" 
                className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg" 
                placeholder='Supervisor'
                {...register("supervisor", { required: "Supervisor es requerido" })}
              />
              {errors.supervisor && <span className="text-red-500">{errors.supervisor.message}</span>}
            </div>
            <div className='relative mb-4'>
              <GrUserManager className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500' />
              <input 
                type="text" 
                className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg" 
                placeholder='DNI Asesor'
                {...register("Asesor", { required: "Asesor es requerido" })}
              />
              {errors.Asesor && <span className="text-red-500">{errors.Asesor.message}</span>}
            </div>
            <div className='relative mb-4'>
              <IoTimeOutline className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500' />
              <input 
                type="datetime-local" 
                className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg" 
                placeholder='Hora de llegada del correo'
                {...register("horaLlegadaCorreo", { required: "Hora de llegada del correo es requerido" })}
              />
              {errors.horaLlegadaCorreo && <span className="text-red-500">{errors.horaLlegadaCorreo.message}</span>}
            </div>
            <div className='relative mb-4'>
              <BsCalendar2Date className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500' />
              <input 
                type="date" 
                className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg" 
                placeholder='Fecha de Desembolso'
                {...register("fechaDesembolso", { required: "Fecha de desembolso es requerido" })}
              />
              {errors.fechaDesembolso && <span className="text-red-500">{errors.fechaDesembolso.message}</span>}
            </div>
           
          </div>

          {
          //segunda setion
          }
          
          <div className="w-full md:w-1/2 px-2">
            <div className='relative mb-4'>
              <FaUserTie className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500' />
              <input 
                type="text" 
                className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg" 
                placeholder='Nombre'
                {...register("nombres", { required: "Nombre son requeridos" })}
              />
              {errors.nombres && <span className="text-red-500">{errors.nombres.message}</span>}
            </div>
            {/* <div className='relative mb-4'>
              <FaAddressBook className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500' />
              <input 
                type="text" 
                className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg" 
                placeholder='Apellidos'
                {...register("apellidos", { required: "Apellidos son requeridos" })}
              />
              {errors.apellidos && <span className="text-red-500">{errors.apellidos.message}</span>}
            </div> */}
            <div className='relative mb-4'>
              <FaMoneyBillTrendUp className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500' />
              <input 
                type="number" 
                className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg" 
                placeholder='Oferta'
                {...register("oferta", { required: "Oferta es requerido" })}
              />
              {errors.oferta && <span className="text-red-500">{errors.oferta.message}</span>}
            </div>
            <div className='relative mb-4'>
              <GiReceiveMoney className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500' />
              <input 
                type="number" 
                className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg" 
                placeholder='Monto de Desembolso'
                {...register("montoDesembolso", { required: "Monto de desembolso es requerido" })}
              />
              {errors.montoDesembolso && <span className="text-red-500">{errors.montoDesembolso.message}</span>}
            </div>
            <div className='relative mb-4'>
              <IoCellular className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500' />
              <input 
                type="number" 
                className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg" 
                placeholder='Número'
                {...register("numero", { required: "Número es requerido" })}
              />
              {errors.numero && <span className="text-red-500">{errors.numero.message}</span>}
            </div>
            <div className='relative mb-4'>
              <FaArchway className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500' />
              <input 
                type="text" 
                className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg" 
                placeholder='Agencia'
                {...register("agencia", { required: "Agencia es requerido" })}
              />
              {errors.agencia && <span className="text-red-500">{errors.agencia.message}</span>}
            </div>
            <div>
          <button type="submit" className='bg-sky-600 text-white w-full py-2 px-6 text-center rounded-lg mt-2'>GUARDAR → </button>
        </div>
          </div>
        </div>
      </form>
    </div>
    <br />
      <TablaRegistro />
    </div>
    )
}

export default Register;
