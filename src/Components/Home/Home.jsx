import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Note from '../Note/Note'
import axios from "axios"
import jwtDecode from "jwt-decode"
import { useFormik } from 'formik'
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react'
import Swal from 'sweetalert2'

export default function Home() {

  // handle modal show and close
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const token = localStorage.getItem("userToken")
  const userID = jwtDecode(token)._id

  const [userNotes,setUserNotes] = useState(null)

  async function deleteNote(NoteID)
  {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ms-3 shadow-0',
        cancelButton: 'btn btn-danger shadow-0'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

       ( async()=>{
          let {data} = await axios.delete("https://route-movies-api.vercel.app/deleteNote",{
            data:{
              NoteID,
              token

            }
          })
          if(data.message ==="deleted")
          {
            getUserNotes()
          }
        })()

        swalWithBootstrapButtons.fire(                  
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
    
  }

  async function getUserNotes()
  {
    let {data} = await axios.get("https://route-movies-api.vercel.app/getUserNotes",{
      headers:{
        token,
        userID
      },
      params:{

      }
      
    })

    setUserNotes(data.Notes)
  }

   async function addNote(note)
  {
      let {data} = await axios.post("https://route-movies-api.vercel.app/addNote",note)
      console.log(data)
      if(data.message == "success")
      {
        getUserNotes()
      }
  }

  let formik = useFormik({
    initialValues:{
      title:"",
      desc:"",
      userID,
      token
    },
    onSubmit: addNote
  })

  useEffect(()=>{
    getUserNotes()
  },[])



  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input onChange={formik.handleChange} className='form-control my-2' type="text" placeholder='title' name='title' id='title' />
            <input onChange={formik.handleChange} className='form-control' type="text" placeholder='description' name='desc' id='desc'/>
          </form>
        </Modal.Body>
        <Modal.Footer className=' d-flex justify-content-center align-items-center'>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={()=>{formik.handleSubmit();handleClose()}}>
            Add Note
          </Button>
        </Modal.Footer>
      </Modal>


    <div className='overflow-hidden'>
      <div className="row">
        <div className="col-2">
            <div className='position-fixed col-lg-2'>
                <Sidebar/>
            </div>
        </div>

        <div className="col-10  px-lg-5 pe-5 py-5">
            <div className='text-center me-2'>
            <button onClick={handleShow}  className='btn btn-info text-white mb-2 '><i className="fa-solid fa-plus"></i> Add Note</button>
            </div>
          <div className="row g-2">
                {userNotes? userNotes.map((note)=>(<Note getUserNotes={getUserNotes} deleteNote={deleteNote} key={note._id} noteDetails={note} />)):<h5 className='text-center mt-5'> Not have any notes yet.</h5>}
          </div>
        </div>
    </div>
    </div>
    </>
  )
}
