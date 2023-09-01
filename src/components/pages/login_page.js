// import axios from "axios";
import React, { useState } from "react";
import axios from "axios";

import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from "yup"; // JS schema validation library for Form validation
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../stores/authSlice";


const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
  });


export default function LoginForm() {


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, onSubmitProps) => {
    try {
        

     
          const loggedInResponse = await axios.post(
            `http://localhost:7800/api/v1/users/login`,
            values
          );
          const loggedIn = loggedInResponse.data;
          console.log("Payload Data:", loggedIn);
          onSubmitProps.resetForm();
    
          if (loggedIn) {
            console.log("Logged in user:", loggedIn.user);
            console.log("User token:", loggedIn.token);
            dispatch(
              setLogin({
                user: loggedIn.user,
                token: loggedIn.token,
                lists:loggedIn.lists
              })
            );
            navigate("/home");
          }
        } catch (err) {
          console.log("Error logging in:", err);
          alert("Login failed, please check login details.");
          onSubmitProps.resetForm();
        }
      };

  
      return (
          <div className="max-w-[280px] mx-auto">
              <Formik
                  initialValues={{
                      
                      email: '',
                      password: '',
                     
                  }}
                  validationSchema={loginSchema}
                  onSubmit={handleSubmit}
              >
                  {({ errors, touched }) => (
                      <Form>
                       
  
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
  
                          
  
                          <button
                              type="submit"
                              className="bg-slate-500 hover:bg-slate-700 text-white text-base rounded-lg py-2.5 px-5 transition-colors w-full text-[19px]"
                          >

                              Log In
                          </button>
                      </Form>
                  )}
              </Formik>
              <p className="text-center mt-3 text-[14px]">
                  Don't have an account?{' '}
                  <a href="/register" className="text-gray-600">
                      Register
                  </a>
              </p>
          </div>
        
      );
  }
  