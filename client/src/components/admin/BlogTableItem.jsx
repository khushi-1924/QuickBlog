import React from 'react'
import { assets } from '../../assets/assets';

const BlogTableItem = ({blog, fetchBlogs, index}) => {

  const { title, createdAt } = blog;
  const BlogDate = new Date(createdAt)

  return (
    <tr className='border-y border-gray-300'>
      <th className='px-2 py-4'>{index}</th>
      <td className='px-2 py-4'>{title}</td>
      <td className='px-2 py-4 max-sm:hidden'>{BlogDate.toLocaleString()}</td>
      <td className='px-2 py-4 max-sm:hidden'>
        <p className={`p-1 text-center rounded text-sm ${blog.isPublished ? "text-green-800 bg-green-100" : "text-orange-700 bg-orange-100"}`}>{blog.isPublished ? 'Published' : 'Unpublished'}</p>
      </td>
      <td className='px-2 py-4 flex justify-between text-xs gap-3'>
        <button className={`border px-2 py-0.5 mt-1 rounded cursor-pointer mx-auto ${blog.isPublished ? 'hover:bg-orange-100/50' : 'hover:bg-green-100/50'}`}>{blog.isPublished ? 'Unpublish' : 'Publish'}</button>
        <img src={assets.cross_icon} alt="cross_icon" />
      </td>
    </tr>
  )
}

export default BlogTableItem
