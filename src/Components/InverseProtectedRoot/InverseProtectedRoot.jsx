import React from 'react'
import {Navigate} from "react-router-dom"
export default function InverseProtectedRoot(props) {
  if(localStorage.getItem("userToken"))
  {
    return <Navigate to="/home"/>
  }
  else
  {
        return props.children
  }
}
