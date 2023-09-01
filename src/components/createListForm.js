import React, { useState } from "react";
import axios from "axios";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup"; // JS schema validation library for Form validation
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectList } from "./stores/authSlice";

export default function AddListForm({ user }) {
  const listFormSchema = yup.object().shape({
    list_name: yup.string().required("required"),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function createList(values, onSubmitProps) {
    try {
      const dataToSend = {
        list_name: values.list_name,
        creator_id: user.id, // Use the user prop here
      };

      const response = await axios.post(
        `http://localhost:7800/api/v1/food_list/createlist`,
        dataToSend
      );
      console.log(response);
      alert("List created successfully!")
      onSubmitProps.resetForm()

      // Dispatching logic can be added here if needed

      

      // Additional navigation logic can be added here if needed
    } catch (err) {
      console.log("Error creating list:", err);
      alert("Go to List? There was an error creating your list!");
      onSubmitProps.resetForm();
    }
  }

  return (
    <div className="max-w-[280px] mx-auto">
      <h1>Add a list now!</h1>
      <Formik
        initialValues={{
          list_name: "",
        }}
        validationSchema={listFormSchema}
        onSubmit={createList}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              type="list_name"
              name="list_name"
              placeholder="Name your list!"
              className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium"
            />
            <ErrorMessage
              name="list_name"
              component="div"
              className="text-red-500"
            />

            {/* Remove the Field for creator_id since it's not needed anymore */}
            {/* <Field
              type="creator_id"
              name="creator_id"
              value={user ? user.id : null}
              className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium"
            />
            <ErrorMessage
              name="creator_id"
              component="div"
              className="text-red-500"
            /> */}

            <button
              type="submit"
              className="bg-slate-500 hover:bg-slate-700 text-white text-base rounded-lg py-2.5 px-5 transition-colors w-full text-[19px]"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
