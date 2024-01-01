import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './auth.css'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate()

  const user = useSelector(st => st.auth.user)
  const [validation, setValidation] = useState(false)

  const handleLogin = (values) => {
    console.log('Logging in with:', values);

    if (user?.username === values?.username && user?.password === values?.password) {
      navigate('/home')
    } else {
      setValidation(true)
    }

  };



  return (
    <div>
      <h2>Login</h2>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        <Form>
          <div>
            <label htmlFor="username">Username:</label>
            <Field type="text" id="username" name="username" />
            {}
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <Field type="password" id="pasbnbsword" name="password" />
            {}
          </div>
          {validation ? <label htmlFor="password22">Enter correct username and password</label> : <></>}
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
