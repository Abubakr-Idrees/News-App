import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './auth.css'
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../Redux/authSlice';
import { Navigate, useNavigate } from 'react-router-dom';


const signupSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Signup = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSignup = (values) => {
    console.log('Signing up with:', values);

    dispatch(setUser(values))
    navigate('/home')

  };

  return (
    <div>
      <h2>Sign Up</h2>
      <Formik
        initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
        validationSchema={signupSchema}
        onSubmit={handleSignup}
      >
        <Form>
          <div>
            <label htmlFor="username">Username:</label>
            <Field type="text" id="username" name="username" />
            {/* <ErrorMessage name="username" component="div" /> */}
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <Field type="email" id="email" name="email" />
            {/* <ErrorMessage name="email" component="div" /> */}
          </div>
          <div>
            <label htmlFor="password1">Password:</label>
            <Field type="password1" id="password1" name="password" />
            {/* <ErrorMessage name="password1" component="div" /> */}
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <Field type="password2" id="confirmPassword" name="confirmPassword" />
            {/* <ErrorMessage name="confirmPassword" component="div" /> */}
          </div>
          <button type="submit">Sign Up</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Signup;
