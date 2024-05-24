import { AiOutlineClose } from 'react-icons/ai'
import { PiBookOpenTextLight } from 'react-icons/pi'
import { BiUserCircle } from 'react-icons/bi'

const BookModel = ({ book, onClose }) => {
    return (
        <div className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center' onClick={onClose}>
            <div className="w-[600px] max-w-full h-[400px] rounded-lg bg-white p-4 flex flex-col relative " onClick={(e) => e.stopPropagation()}>
                <AiOutlineClose className='absolute top-6 right-6 text-3xl cursor-pointer text-red-600' onClick={onClose} />
                <h2 className="w-fit px-4 py-1 bg-red-300 rounded-lg"> {book.publishYear} </h2>
                <h4 className='my-2 text-gray-500 '>{book._id}</h4>
                <div className="flex justify-start items-center gap-x-2">
                    <PiBookOpenTextLight className='text-2xl text-red-300' />
                    <h2 className='my-1'>{book.title}</h2>
                </div>
                <div className="flex items-center justify-start gap-x-2">
                    <BiUserCircle className='text-2xl text-blue-300' />
                    <h2 className='my-1'>{book.author}</h2>
                </div>
                <p className="mt-4">Anything You want to show</p>
                <p className="my-2">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia ipsum quaerat, nisi unde nesciunt sunt quis nobis hic, molestias possimus eos totam dolorem. Hic vero in, error harum iste eveniet facere reprehenderit consequatur nesciunt nobis porro explicabo cumque, unde odit.
                </p>
            </div>
        </div>
    )
}

export default BookModel