
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from './redux/app/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <Provider  store={store}>
    <App />
    <ToastContainer/>
  </Provider>
 </>
)
