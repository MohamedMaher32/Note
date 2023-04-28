import React from 'react'
import notesImg from "../../images/notes1.png"
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from "axios"
import {useNavigate,Link} from "react-router-dom"
import { useState } from 'react'
export default function Registration() {
  const navigate = useNavigate()
  const [regError , setRegError] = useState(null)
  const [isLoading , setIsLoading] = useState(false)
  async function handleRegistration(regObject)
  {
    setIsLoading(true)
    let {data} = await axios.post("https://route-movies-api.vercel.app/signup",regObject)
    if(data.message === "success")
    {
      setIsLoading(false)
      formik.resetForm()
      navigate("/login")
       
    }
    else
    {
      setRegError(data.errors.email.message)
      setIsLoading(false)
    }

  }


  const validation = Yup.object({
    first_name:Yup.string().required("first name is required").min(3 , "min length is 3 ").max(20 , "max length is 20"),
    last_name:Yup.string().required("last name is required").min(3 , "min length is 3 ").max(20 , "max length is 20"),
    email:Yup.string().required("email is required").email("email is invalid"),
    password:Yup.string().required("password is required").matches(/^[A-Za-z0-9!@#$%&*_-]{8,}$/,"your password must be at least 8"),
    age:Yup.number().required("age is required").min(15 , "min age is 10 ").max(100 , "max age is 100"),
  })

  let formik = useFormik({
    initialValues:{
      first_name:"",
      last_name:"",
      email:"",
      password:"",
      age:""
    },
    validationSchema:validation,
    onSubmit: handleRegistration

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
              <input value={formik.values.first_name}  onChange={formik.handleChange} onBlur={formik.handleBlur}  className='form-control my-2' type="text" name='first_name' id='first_name' placeholder='First Name' />
              {formik.errors.first_name && formik.touched.first_name? <p className='text-danger text-start'>{formik.errors.first_name}</p>:null}
              <input value={formik.values.last_name} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' type="text" name='last_name' id='last_name' placeholder='Last Name' />
              {formik.errors.last_name && formik.touched.last_name? <p className='text-danger text-start'>{formik.errors.last_name}</p>:null}
              <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' type="email" name='email' id='email' placeholder='Email' />
              {formik.errors.email && formik.touched.email? <p className='text-danger text-start'>{formik.errors.email}</p>:null}
              <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' type="password" name='password' id='password' placeholder='Password' />
              {formik.errors.password && formik.touched.password? <p className='text-danger text-start'>{formik.errors.password}</p>:null}
              <input value={formik.values.age} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' type="number" name='age' id='age' placeholder='Age' />
              {formik.errors.age && formik.touched.age? <p className='text-danger text-start'>{formik.errors.age}</p>:null}
              {regError && <p className='alert alert-danger'>{regError}</p>}
              {isLoading ? <button type='submit' className='btn btn-info text-light w-100 rounded-2 mt-2'><i className='fa-solid fa-spinner fa-spin'></i></button>:<button type='submit' className='btn btn-info text-light w-100 rounded-2 mt-2'> Sign Up</button>}
              <p className='pt-2'>Already have account?<Link className='text-decoration-none' to='/login'> Login</Link></p>
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
