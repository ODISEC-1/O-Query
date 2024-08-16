import { BrowserRouter , Routes , Route,useLocation} from "react-router-dom"
import AuthLayout from "./Layout/Auth/AuthLayout"
import Login  from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { Toaster } from 'react-hot-toast';
import PrivateRoute from "./services/PrivateRoute";
import Navbar from "./Layout/Navigate/Navbar";

function App() {

  const Location = useLocation();
  const hideNavbar = Location.pathname === '/'
  return (<>
  {!hideNavbar && <Navbar/>}
    <Toaster />
    <Routes>
      <Route path="/" element={<AuthLayout/>}>
      <Route index element ={<Login/>}/>
      <Route path="/DerivacionesRegistro" element ={
           <PrivateRoute>
             <Register/>
           </PrivateRoute>
        }/>
      </Route>
    </Routes>
    </>
  )
}

export default App