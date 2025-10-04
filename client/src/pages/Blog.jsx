import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { assets, blog_data, comments_data } from '../assets/assets';
import Navbar from '../components/Navbar';
import Moment from 'moment';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import Skeleton from 'react-loading-skeleton';

const Blog = () => {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const fetchBlogData = async() => {
    const blogData = blog_data.find(item => item._id === id);
    setData(blogData);
  }

  const fetchComments = async() => {
    setComments(comments_data);
  }

  const addComment = async(e) => {
    e.preventDefault();
  }

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [])

  return data ? (
    <div className='relative'>
      <img src={assets.gradientBackground} alt="gradient_bg" className='absolute -top-50 -z-1 opacity-50' />

      <Navbar />

      <div className='text-center mt-20 text-gray-600'>
        <h1 className='text-2xl sm:text-5xl font-bold max-w-2xl mx-auto text-gray-800'>{data.title}</h1>
        <h2 className='my-5 max-w-lg mx-auto text-gray-500 italic'>{data.subTitle}</h2>
        <div className="flex items-center justify-center gap-3 text-sm text-gray-500 mb-3">
          <span className="font-medium text-primary">Mike Brown</span>
          <span>•</span>
          <span>{Moment(data.createdAt).format("MMMM Do, YYYY")}</span>
        </div>
      </div>

      <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
        <img src={data.image} alt="image" className='rounded-3xl mb-5' />

        <div className='rich-text max-w-3xl mx-auto mb-10' dangerouslySetInnerHTML={{__html: data.description}} />

        <hr className='border-gray-200' />

        {/* Comment section */}
        <div className='mt-10 mb-10 max-w-3xl mx-auto'>
          <p className='text-lg font-semibold mb-4'>Comments ({comments.length})</p>

          <div className='flex flex-col gap-4'>
            {comments.map((item, index) => (
              <div key={index} className='relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600'>
                <div className='flex items-center gap-2 mb-2'>
                  <img src={assets.user_icon} alt="user_icon" className='w-6' />

                  <p className='font-medium'>{item.name}</p>
                </div>
                <p className='text-sm max-w-md ml-8'>{item.content}</p>

                <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs'>{Moment(item.createdAt).fromNow()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* add comment section */}
        <div className='max-w-3xl mx-auto'>
          <p className='font-semibold mb-4'>Add your comment</p>

          <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg'>

            <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Name' className='w-full p-2 border border-gray-300 rounded outline-none' required />

            <textarea onChange={(e) => setContent(e.target.value)} value={content} placeholder='Comment' className='w-full p-2 border border-gray-300 rounded outline-none h-48'></textarea>

            <button type="submit" className='bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer'>Comment</button>
          </form>
        </div>
        
        {/* Share buttons */}
        <div className='my-24 max-w-3xl mx-auto'>
          <p className='font-semibold my-4'>Share this article with your friends</p>

          <div className='flex'>
            <img src={assets.facebook_icon} alt="facebook" width={50} />
            <img src={assets.twitter_icon} alt="twitter" width={50} />
            <img src={assets.googleplus_icon} alt="googleplus" width={50} />
          </div>
        </div>

        <Footer />

      </div>

    </div>
  ) : <div className='h-screen'>
    <Loader />
  </div>
}

export default Blog