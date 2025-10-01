import React from 'react'

const NewsLetter = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center space-y-2 my-32'>
      <h1 className='md:text-4xl text-2xl font-semibold'>Never Miss a Blog!</h1>
      <p className='md:text-lg text-gray-500/70 pb-8'>Subscribe to get the latest blog, new tech, and exclusive news.</p>

      <form className='flex justify-between max-w-2xl w-full max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded-full overflow-hidden'>
          <input type="text" placeholder='Enter your email id' className='w-full pl-4 outline-none' required />
          <button type='submit' className='bg-primary text-white px-8 py-2 m-1.5 rounded-full hover:scale-105 transition-all cursor-pointer'>Subscribe</button>
        </form>
    </div>
  )
}

export default NewsLetter
