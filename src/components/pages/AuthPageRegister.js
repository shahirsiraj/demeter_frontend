
import axios from "axios";
import { useState } from "react";

import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup"; // JS schema validation library for Form validation
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const registerSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
});






export default function AuthPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
      
        const handleSubmit = async (values, onSubmitProps) => {
          try {
              
  
              const dataToSend = {
                  name: values.name,
                  email: values.email,
                  password: values.password,
              };
              const response = await axios.post(`http://localhost:7800/api/v1/users/register`, dataToSend);
  
              console.log(response)
              onSubmitProps.resetForm()
  
              // Redirect to the login page after successful registration
              navigate('/login');
          } catch (error) {
              console.error(error);
          }
      };
  

  return (
    <div>
    <div className="w-full bg-blue-200 p-4 md:text-center">
      <h1 className="font-bold text-2xl text-primary">Bacchus</h1>
    </div>

    <div className="w-full md:w-1/2 mx-auto p-8 m-8 md:m-2 rounded-lg bg-blue-200">
      <h2 className="font-semibold text-lg text-center mb-6">
        Welcome to Bacchus, your food buddy!
      </h2>
      <div className="max-w-[280px] mx-auto">
              <Formik
                  initialValues={{
                      name: '',
                      email: '',
                      password: '',
                      confirmPassword: '',
                  }}
                  validationSchema={registerSchema}
                  onSubmit={handleSubmit}
              >
                  {({ errors, touched }) => (
                      <Form>
                          <Field
                              type="text"
                              name="name"
                              placeholder="Name"
                              className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium"
                          />
                          <ErrorMessage
                              name="name"
                              component="div"
                              className="text-red-500"
                          />
  
                          <Field
                              type="email"
                              name="email"
                              placeholder="Email"
                              className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium"
                          />
                          <ErrorMessage
                              name="email"
                              component="div"
                              className="text-red-500"
                          />
  
                          <Field
                              type="password"
                              name="password"
                              placeholder="Password"
                              className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium"
                          />
                          <ErrorMessage
                              name="password"
                              component="div"
                              className="text-red-500"
                          />
  
                          <Field
                              type="password"
                              name="confirmPassword"
                              placeholder="Confirm Password"
                              className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium"
                          />
                          <ErrorMessage
                              name="confirmPassword"
                              component="div"
                              className="text-red-500"
                          />
  
                          <button
                              type="submit"
                              className="bg-slate-500 hover:bg-slate-700 text-white text-base rounded-lg py-2.5 px-5 transition-colors w-full text-[19px]"
                          >

                              Register
                          </button>
                      </Form>
                  )}
              </Formik>
              <p className="text-center mt-3 text-[14px]">
                  Already have an account?{' '}
                  <a href="/login" className="text-gray-600">
                      Log In
                  </a>
              </p>
          </div>
    </div>
  </div>
  );
}