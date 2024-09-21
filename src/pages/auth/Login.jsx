import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { VscAccount, VscKey, VscEye, VscEyeClosed } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VerifyLogin } from "../../redux/features/Login/Thunk/Auth";
import toast from "react-hot-toast";

export const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { response, status, error } = useSelector((state) => state.AuthLogin);


  useEffect(() => {
    if (status === 'succeeded') { 
      toast.success('BIENVENIDO');
      navigate('/DerivacionesRegistro');
    } else if (status === 'failed') { 
      toast.error('Datos Errados');
    }
  }, [status, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit = (data) => {
    const estructura = {
      Name_usuario: data.Usuario,
      Password_usuario: data.Contraseña
    };
    dispatch(VerifyLogin(estructura));
  };

  return (
    <div className="bg-white p-8 rounded-lg w-full md:w-96">
      <div className="mb-10">
        <h1 className="text-3xl uppercase font-bold text-center">Iniciar Sesión</h1>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <VscAccount className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg"
            placeholder="Usuario"
            name="Usuario"
            {...register('Usuario', { required: 'Usuario es requerido' })}
          />
        </div>
        {errors.Usuario && <span className="text-red-500">{errors.Usuario.message}</span>}

        <div className="relative">
          <VscKey className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg"
            placeholder="Contraseña"
            name="Contraseña"
            {...register('Contraseña', {
              required: 'Contraseña es requerida',
              pattern: {
                value: /^\d{8}$/,
                message: 'La Contraseña debe contener exactamente 8 dígitos'
              }
            })}
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <VscEyeClosed /> : <VscEye />}
          </button>
        </div>
        {errors.Contraseña && <span className="text-red-500">{errors.Contraseña.message}</span>}

        <div>
          <button type="submit" className="bg-sky-600 text-white w-full py-2 px-6 text-center rounded-lg mt-6">Ingresar</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
