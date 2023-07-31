import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Bar from './components/navbar';
import Home from "./pages/home"
import Dashboard from './pages/dashboard';
import Products from "./components/Products/products";
import Dash  from "./components/HeaderDash";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Clients from './components/Customer/clients';
import MakeOrder from './components/Orders/AddOrder';
import Orders from './components/Orders/orders';
import Footer from './components/footer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAuthUser } from './JS/actions/user';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './components/PrivateRoute';
import ContactUs from './components/contactUs';



function App() {
const dispatch= useDispatch()

const getUser= async()=>{
 await dispatch(getAuthUser())
}

useEffect(()=>{
  if(localStorage.getItem("token")){
    getUser()
  }
},[])
  return (
    <div  >
      <BrowserRouter>
      <Bar />
      <Routes>
      <Route path='/'element={<Home  />}/>
      <Route path='/dashboard' element={<Dash /> }>
            <Route index element={<PrivateRoute> <Dashboard /></PrivateRoute> }/>
            <Route path='products' element={<PrivateRoute><Products /></PrivateRoute>}/>
            <Route path='Customer' element ={<PrivateRoute><Clients /></PrivateRoute>}/>
            <Route path='currentOrder' element ={<PrivateRoute><MakeOrder /></PrivateRoute>}/>
            <Route path='Orders' element ={ <PrivateRoute><Orders /></PrivateRoute> }/>
      </Route>
      <Route path='/contact'element={<ContactUs />}/>
      </Routes>
      <Footer />
      </BrowserRouter>
      <ToastContainer />

    </div>
  );
}

export default App;
