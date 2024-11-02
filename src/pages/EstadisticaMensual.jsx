import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllJZ } from "../redux/features/Datos/Thunk/JefeZonal";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";

function EstadisticaMensual() {
   const DataRedux = useSelector((stateJZ) => stateJZ.JefeZonal);
   const DataJZ = DataRedux.datoJZ.filter((e) => e.Nombre_JZ !== '------');
   const dispatch = useDispatch();

   useEffect(() => {
       dispatch(FetchAllJZ());
   }, []);

   return (
       <>
           <div className="p-4">
            <h1 className="text-xl text-red-500">AUN EN DESARROLLO</h1>
               <h1 className="text-3xl font-bold text-center mt-4 uppercase">Estadística Mensual</h1>
               <div className="mt-10">
                   {DataJZ.map((e) => (
                       <div key={e.id_JZ} className="flex items-center justify-between border-b pb-2 mb-2 hover:bg-gray-100 transition duration-200">
                           <ul className="list-none flex-1 text-left">
                               <li className="text-lg md:text-xl font-semibold">
                                   {e.Nombre_JZ}
                               </li>
                           </ul>
                           <KeyboardDoubleArrowRight className="text-gray-500" />
                           <p className="text-lg font-semibold">
                               S/0.00
                           </p>
                       </div>
                   ))}
               </div>
           </div>
       </>
   );
}

export default EstadisticaMensual;
