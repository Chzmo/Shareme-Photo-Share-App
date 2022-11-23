import {Routes, Route, useNavigate} from 'react-router-dom'
import { useEffect } from 'react';
import {GoogleOAuthProvider } from '@react-oauth/google'
import { fetchUser } from './utils/fetchUser';
import Home from './container/Home';
import Login from './components/Login';
import './App.css';
import './index.css';


function App() {
  const navigate = useNavigate();
  const clientId = process.env.REACT_APP_GOOGLE_API_TOKEN

  useEffect(() =>{
    const user = fetchUser();
    if(!user) navigate('/login');
  },[])
  return (
    <GoogleOAuthProvider clientId={`${clientId}`}>
      <Routes>
        <Route path='login' element={<Login/>}/>
        <Route path='/*' element={<Home/>}/>
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
