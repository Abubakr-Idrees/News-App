import React, { useEffect } from 'react';
import Home from './components/Home';
import Login from './auth/Login';
import Signup from './auth/Signup';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';


function App() {
  const navigate = useNavigate()
  const user = useSelector(st => st.auth.user)
  console.log('user from app', user?.username)

  useEffect(() => {
    if (user?.username) {

      navigate('/home')
    }
  }, [])

  return (
    <>
      {user?.username ?
        <Login />
        :
        <Signup />
      }
    </>

  );
}

export default App;
