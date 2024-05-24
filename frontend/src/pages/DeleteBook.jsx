import React, { useState } from 'react'
import axios from 'axios'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'



const DeleteBook = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const { enqueueSnackbar } = useSnackbar()

  const handleDeleteBook = () => {
    setLoading(true)
    axios.delete(`http://localhost:5555/books/${id}`)
      .then((res) => {
        setLoading(false)
        enqueueSnackbar("Book deleted successfully", { variant: 'success' })
        navigate('/')
      }).catch((error) => {
        // alert("An error occurred while deleting the book please cheak the console")
        enqueueSnackbar("An error occurred while deleting the book", { variant: 'error' })
        console.log("Error:", error.message)
        setLoading(false)
      })
  }


  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-8 items-center  mx-auto">
        <h3 className='text-2xl text-gray-500'>Are you sure you want to delete this book?</h3>
        <div className="my-4">
          <button onClick={handleDeleteBook} className='bg-red-500 text-white px-4 py-2 rounded-md'>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteBook