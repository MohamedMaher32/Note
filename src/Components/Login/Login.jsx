import React from 'react'
import notesImg from "../../images/notes3.png"
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from "axios"
import {useNavigate,Link} from "react-router-dom"
import { useState } from 'react'

export default function Login() {
    const navigate = useNavigate()
    const [regError , setRegError] = useState(null)
    const [isLoading , setIsLoading] = useState(false)


  async function handleLogin(regObject)
  {

    setIsLoading(true)
    let {data} = await axios.post("https://route-movies-api.vercel.app/signin",regObject)
    if(data.message === "success")
    {
        setIsLoading(false)
        localStorage.setItem("userToken", data.token)
        navigate("/home")
    }
    else
    {
      setRegError(data.message)
      setIsLoading(false)
    }
  }


  const validation = Yup.object({
    email:Yup.string().required("email is required").email("email is invalid"),
    password:Yup.string().required("password is required").matches(/^[A-Za-z0-9!@#$%&*_-]{8,}$/,"enter your valid password"),
  })

  let formik = useFormik({
    initialValues:{
      email:"",
      password:"",
    },
    validationSchema:validation,
    onSubmit: handleLogin

  })

  return (
    <>
    <li className="fixed-top p-3 pe-lg-5 d-lg-flex d-none  ">
        <i className="fa-regular fa-note-sticky text-info fs-2"></i>                           
        <p className='ps-2 fs-4 fw-bold'>Notes</p>
    </li>
    <div className="container">
      <div className="row">
        <div className="col-lg-5 d-none d-lg-flex justify-content-center align-items-center">
          <img className='w-100 p-5' src={notesImg}  alt="" />
        </div>
       
       
        <div className="col-lg-7">
        <div className='min-vh-100 d-flex justify-content-center align-items-center text-center signup-container'>
        <div className='bg-light bg-opacity-25 shadow w-100 mx-auto  p-5 rounded-2'>
            <h1 className='fw-bold'>Sign Up Now</h1>
            <div className='pt-3'>
            <form onSubmit={formik.handleSubmit}>
              <input onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' type="email" name='email' id='email' placeholder='Email' />
              {formik.errors.email && formik.touched.email? <p className='text-danger text-start'>{formik.errors.email}</p>:null}
              <input onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' type="password" name='password' id='password' placeholder='Password' />
              {formik.errors.password && formik.touched.password? <p className='text-danger text-start'>{formik.errors.password}</p>:null}
              {regError && <p className='alert alert-danger'>{regError}</p>}
              {isLoading ? <button type='submit' className='btn btn-info text-light w-100 rounded-2 mt-2'><i className='fa-solid fa-spinner fa-spin'></i></button>:<button type='submit' className='btn btn-info text-light w-100 rounded-2 mt-2'>Login</button>}
              <p className='pt-2'>Don't have account? <Link className='text-decoration-none' to='/'>Sign Up</Link></p>
            </form>
            </div>
        </div>
    </div>
        </div>
      </div>
    </div>

    </>
  )
}
