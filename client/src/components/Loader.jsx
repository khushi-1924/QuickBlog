import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Loader = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <Skeleton count={10} />
      {/* <div className='animate-spin rounded-full h-16 w-16 border-4 border-t-white border-gray-700'></div> */}
    </div>
  )
}

export default Loader
