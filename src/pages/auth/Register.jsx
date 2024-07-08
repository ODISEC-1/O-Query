
import { FaArchway , FaAddressCard , FaAddressBook  , FaUserTie  } from "react-icons/fa";
import { IoTimeOutline ,IoCellular   } from "react-icons/io5";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import { GrMapLocation , GrUserManager } from "react-icons/gr";
import { BsCalendar2Date } from "react-icons/bs";

function Register() {
  return (
    <div className='bg-white p-8 rounded-lg w-full md:w-96'>
    <div className='mb-10'>
        <h1 className='text-3xl uppercase font-bold text-center'>Registrar</h1>
    </div>
    <form className='flex flex-col gap-4'>
        <div className='relative'>
          <FaAddressCard  className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500'/>
        <input type="number" className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg" placeholder='DNI Consulta'/>
        </div>
        <div className='relative'>
          <FaUserTie  className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500'/>
        <input type="Name" className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg" placeholder='Nombres'/>
        </div>
        <div className='relative'>
          <FaAddressBook  className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500'/>
        <input type="LastName" className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg" placeholder='Apellidos'/>
        </div>
        <div className='relative'>
          <FaMoneyBillTrendUp className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500'/>
        <input type="number" className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg" placeholder='Oferta'/>
        </div>
        <div className='relative'>
          <IoCellular  className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500'/>
        <input type="number" className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg" placeholder='Numero'/>
        </div>
        <div className='relative'>
          <GrMapLocation className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500'/>
        <input type="text" className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg" placeholder='Jefe Zonal'/>
        </div>
        <div className='relative'>
          <GrUserManager className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500'/>
        <input type="text" className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg" placeholder='Supervisor'/>
        </div>
        <div className='relative'>
          <IoTimeOutline className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500'/>
        <input type="datetime-local" className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg" placeholder='Hora de llegada del correo'/>
        </div>
        <div className='relative'>
          <BsCalendar2Date className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500'/>
        <input type="Date" className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg" placeholder='Fecha de Desembolso'/>
        </div>
        <div className='relative'>
          <FaArchway className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500'/>
        <input type="text" className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg" placeholder='Agencia'/>
        </div>
        <div className='relative'>
          <GiReceiveMoney className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500'/>
        <input type="number" className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg" placeholder='Monto de Desembolso'/>
        </div>
        <div>
          <button className='bg-sky-600 text-white w-full py-2 px-6 text-center rounded-lg mt-6'>Ingresar</button>
        </div>
    </form>
    
</div>
  )
}

export default Register