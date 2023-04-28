import { useFormik } from 'formik';
import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios"



export default function Note({noteDetails,deleteNote , getUserNotes}) {


  // handle modal show and close
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  async function updateNote(values)
  {
      let {data} = await axios.put("https://route-movies-api.vercel.app/updateNote",values)
      if(data.message === "updated")
      {
        getUserNotes()
      }
  }

  let formik = useFormik({
    initialValues:{
      title:noteDetails.title,
      desc:noteDetails.desc,
      NoteID:noteDetails._id,
      token:localStorage.getItem("userToken")
    },
    onSubmit: updateNote
  })
  return (
    <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upadate Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input onChange={formik.handleChange} defaultValue={noteDetails.title} className='form-control my-2' type="text" placeholder='title' name='title' id='title' />
            <input onChange={formik.handleChange} defaultValue={noteDetails.desc} className='form-control' type="text" placeholder='description' name='desc' id='desc'/>
          </form>
        </Modal.Body>
        <Modal.Footer className=' d-flex justify-content-center align-items-center'>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={()=>{formik.handleSubmit();handleClose()}}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>



    <div className="col-lg-6 col-sm-12">
        <div className='bg-white p-4 m-2 rounded-2 shadow-sm'>
            <h3 className='text-dark fw-bold'>{noteDetails.title}</h3>
            <p className='text-muted'>{noteDetails.desc}</p>
        <div>
            <i onClick={()=>{deleteNote(noteDetails._id)}}  className="fa-solid fa-trash-can pe-2 cursor-pointer text-danger fs-4"></i>
            <i onClick={handleShow}  className="fa-solid fa-pen-to-square cursor-pointer text-success fs-4"></i>
            </div>
        </div>
    </div>
    </>
  )
}
