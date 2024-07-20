import { BrowserRouter , Routes , Route} from "react-router-dom"
import AuthLayout from "./Layout/Auth/AuthLayout"
import Login  from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
    <Toaster />
    <Routes>
      <Route path="/" element={<AuthLayout/>}>
      <Route index element ={<Login/>}/>
      <Route path="registro" element ={<Register/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App