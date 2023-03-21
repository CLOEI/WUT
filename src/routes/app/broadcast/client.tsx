import React from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

function Client() {
  const { id } = useParams();
  const { handleSubmit, register } = useForm();

  return (
    <form className='px-2 overflow-y-auto cus-scrollbar scrollbar-thumb-secondary' onSubmit={handleSubmit(null)}>
     <div className='flex justify-between'>
      <h1 className='font-bold text-3xl mb-2'>{id}</h1>
     </div>
     <div className='mt-6'>
      <h2 className='font-bold text-xl mb-1'>Message</h2>
      <textarea className='resize-none w-full h-24 bg-secondary outline-none p-2 mb-1' {...register("message")}/>
      <input type="file" {...register("media")}/>
     </div>
     <div className='mt-4'>
      <h2 className='font-bold text-xl mb-1'>Numbers</h2>
      <textarea className='resize-none w-full h-24 bg-secondary outline-none p-2' {...register("numbers")}/>
     </div>
    </form>
  )
}

export default Client