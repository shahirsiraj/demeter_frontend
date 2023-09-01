import React, { useState, useEffect } from "react";
import axios from "axios";

import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from "yup"; // JS schema validation library for Form validation
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectFoodList } from "../stores/authSlice";
import CreateListForm from "../createListForm"
import ShowLists from "../listDisplay"


  



export default function ListPage() {


const user = useSelector((state)=> state.user)
const list = useSelector((state) => state.selectedList);
const anyList = useSelector((state) => state.lists);

const [userList , setUserList ] = useState(false)

useEffect(()=> {
    console.log(anyList)
    if(anyList.length > 0) {
        setUserList(true)
    } 
}, [])

  


return (
    <div>
        {!userList ? <CreateListForm user={user}/> 
        : <ShowLists/>
        }
        {/* <CreateListForm/> */}
    

    </div>
 
  
    
)

}