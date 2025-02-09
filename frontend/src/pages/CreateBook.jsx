import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar()


  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear
    }
    setLoading(true)
    axios.post('http://localhost:5555/books', data)
      .then((res) => {
        // console.log(res.data)
        setLoading(false)
        enqueueSnackbar("Book saved successfully", { variant: 'success' })
        navigate('/')
      }).catch((error) => {
        // alert("An error occurred while saving the book please cheak the console")
        enqueueSnackbar("An error occurred while saving the book", { variant: 'error' })
        console.log("Error:", error.message)
        setLoading(false)
      })
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label htmlFor="" className='text-xl mr-4 text-gray-500'>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='border-2 border-gray-500 rounded-md px-4 py-2 w-full' />
        </div>
        <div className="my-4">
          <label htmlFor="" className='text-xl mr-4 text-gray-500'>Author</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className='border-2 border-gray-500 rounded-md px-4 py-2 w-full' />
        </div>
        <div className="my-4">
          <label htmlFor="" className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input type="number" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} className='border-2 border-gray-500 rounded-md px-4 py-2 w-full' />
        </div>
        <button className='bg-green-500 text-white p-2 m-8 rounded-lg w-full mx-auto hover:bg-green-600' onClick={handleSaveBook}>Save Book

        </button>
      </div>
    </div>
  )
}

export default CreateBook