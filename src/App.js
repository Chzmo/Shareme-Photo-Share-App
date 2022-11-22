import './App.css';
import './index.css';
import {Routes, Route, useNavigate} from 'react-router-dom'
import Home from './container/Home';
import Login from './components/Login';
import { useEffect } from 'react';
import { fetchUser } from './utils/fetchUser';


function App() {
  const navigate = useNavigate();

  useEffect(() =>{
    const user = fetchUser();
    if(!user) navigate('/login');
  },[])
  return (
    <Routes>
      <Route path='login' element={<Login/>}/>
      <Route path='/*' element={<Home/>}/>
    </Routes>
  );
}

export default App;
