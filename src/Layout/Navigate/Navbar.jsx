import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useLocation } from 'react-router-dom';
import '../../style/components/MenuUser.css'
import { decryptData } from '../../utils/Encriptar';

const style = {
  width: '1.5em',
  height: '1.5em'
};

function Navbar() {
  const [isUserOpen, setIsUserOpen] = useState(false);
 const descryp = decryptData(JSON.parse(localStorage.getItem('token')))
 const d = descryp

 const toggleUser = () => {
    setIsUserOpen(!isUserOpen);
  };
  const toggleMenu=()=>{
    setIsMenuOpen(!isMenuOpen)
  }
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const ClearLocalStorage = () => {
    localStorage.clear();
    location.reload();
  };

  const Location = useLocation();
  
  return (
    <nav className="bg-white border-gray-200 dark:bg-sky-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://odisec.com/assets/images/logo/logo.png" className="h-14" alt="ODISEC Logo" />
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          
        <button 
            data-collapse-toggle="navbar-user" 
            type="button" 
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
            aria-controls="navbar-user" 
            aria-expanded={isMenuOpen ? "true" : "false"}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button> 
          
          
          {isUserOpen && (
            <div
               className='contenedorUser'
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">{d?.Nombre_Real || null}</span>
                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{d?.Name_usuario || null}</span>
                <span className="block text-sm text-gray-500 dark:text-gray-400">{d?.DNI_Usuario || null}</span>
                <span className="block text-sm text-gray-500 dark:text-gray-400">{d?.puesto?.puesto || null}</span>
              </div>
              <div>
                <button className="text-white p-2" onClick={ClearLocalStorage}>
                  Sign out
                </button>
              </div>
            </div>
          )}
     <button 
            type="button" 
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" 
            id="user-menu-button" 
            aria-expanded={isUserOpen ? "true" : "false"} 
            onClick={toggleUser}
          >
            <AccountCircleIcon sx={style} />
          </button>

       
        </div>
        <div className={`items-center justify-between ${isMenuOpen ? " animate-slide-down block" : "hidden"} w-full md:flex md:w-auto md:order-1`} id="navbar-user">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-sky-700 dark:border-gray-700">
            <li>
              <a href="/DerivacionesRegistro" className={`block py-2 px-3 rounded md:p-0 ${Location.pathname === '/DerivacionesRegistro' ? 'text-blue-700 dark:text-yellow-500' : 'text-gray-900 dark:text-white'}`}>
                Registro Derivacion
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
