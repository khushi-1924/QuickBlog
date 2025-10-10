import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { parse } from 'marked'

const AddBlog = () => {

  const { axios } = useAppContext()
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('Startup');
  const [isPublished, setIsPublished] = useState(false);

  const onSubmitHandler = async(e) => {
    try {
      e.preventDefault();
      setIsAdding(true);
      const blog = {
        title, subtitle, 
        description: quillRef.current.root.innerHTML,
        category, isPublished
      }

      const formData = new FormData();
      formData.append('blog', JSON.stringify(blog))
      formData.append('image', image);

      const { data } = await axios.post('/api/blog/add', formData);

      if (data.success) {
        toast.success(data.message)
        setImage(false)
        setTitle('')
        setSubtitle('')
        quillRef.current.root.innerHTML = ''
        setCategory('Startup')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsAdding(false)
    }
  }

  const generateContent = async() => {
    if (!title)
      return toast.error('Please enter your title')

    try {
      setLoading(true);
      const { data } = await axios.post('/api/blog/generate', { prompt: title });

      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Initiate Quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {theme: 'snow'})
    }
  }, [])

  return (
    <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>
        <p>Upload Thumbnail</p>
        <label htmlFor="image">
          <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="upload_area" className='mt-2 h-16 rounded cursor-pointer' />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
        </label>

        <p className='mt-4'>Blog Title</p>
        <input type="text" placeholder='Enter Blog title here' className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' required onChange={(e) => setTitle(e.target.value)} value={title} />

        <p className='mt-4'>Blog Subtitle</p>
        <input type="text" placeholder='Enter Blog subtitle here' className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' required onChange={(e) => setSubtitle(e.target.value)} value={subtitle} />

        <p className='mt-4'>Blog Description</p>
        <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
          <div ref={editorRef}></div>
      
          <button onClick={generateContent} disabled={loading} type="button" className={`absolute bottom-7 sm:bottom-2 right-2 ml-2 text-xs px-4 py-1.5 rounded-3xl border transition-all flex gap-2 ${loading ? 'border-gray-700 text-gray-500' : 'border-primary/40 text-primary hover:bg-primary/10 cursor-pointer'}`}>
          {!loading && 
          <img src={assets.star_icon} alt="star_icon" />}
          {loading ? 'Generating Content...' : 'Generate with AI'}</button>
        </div>

        <p className='mt-4'>Blog Category</p>
        <select onChange={e => setCategory(e.target.value)} name="category" className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'>
          <option value="">Select Category</option>
          {blogCategories.map((item, index) => {
            return <option key={index} value={item}>{item}</option>
          })}
        </select>

        <div className='flex gap-2 mt-4'>
          <input type="checkbox" checked={isPublished} className='scale-125 cursor-pointer' onChange={e => setIsPublished(e.target.checked)} />
          <p>Publish Now</p>
        </div>

        <button disabled={isAdding} type='submit' className={`mt-8 w-40 h-10 ${isAdding ? 'bg-gray-400' : 'bg-primary cursor-pointer opacity-90 hover:opacity-100'} text-white rounded-full text-sm  transition-all`}>
          {isAdding ? 'Adding...' : 'Add Blog'}
        </button>
      </div>
    </form>
  )
}

export default AddBlog
