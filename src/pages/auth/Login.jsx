
import { VscAccount , VscKey } from "react-icons/vsc";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
      <div className='bg-white p-8 rounded-lg w-full md:w-96'>
        <div className='mb-10'>
            <h1 className='text-3xl uppercase font-bold text-center'>Iniciar Secion</h1>
        </div>
        <form className='flex flex-col gap-4'>
            <div className='relative'>
              <VscAccount className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500'/>
            <input type="User" className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg" placeholder='Usuario'/>
            </div>
            <div className='relative'>
              <VscKey className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-500'/>
            <input type="Password" className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg" placeholder='Contraseña'/>
            </div>
            <div>
            <Link to={'/DerivacionesRegistro'}> <button className='bg-sky-600 text-white w-full py-2 px-6 text-center rounded-lg mt-6'>Ingresar</button></Link>
            </div>
        </form>
    </div>
  )
}

export default Login;