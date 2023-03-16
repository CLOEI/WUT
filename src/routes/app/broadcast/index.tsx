import React from 'react'

function Index() {
  return (
    <div className='px-2 overflow-y-auto cus-scrollbar scrollbar-thumb-secondary'>
     <div className='flex justify-between'>
      <h1 className='font-bold text-3xl mb-2'>Broadcast</h1>
      <button className='bg-secondary px-4 py-2 rounded-md enabled:active:scale-90'>Start</button>
     </div>
     <div className='flex space-x-2'>
      <p>Type : </p>
      <div>
      <div>
          <input type="radio" name="type" id="client" defaultChecked/>
          <label htmlFor="client"> By Client</label>
        </div>
        <div>
          <input type="radio" name="type" id="random"/>
          <label htmlFor="random"> Random</label>
        </div>
      </div>
     </div>
     <div className='mt-6'>
      <h2 className='font-bold text-xl mb-1'>Message</h2>
      <textarea className='resize-none w-full h-24 bg-secondary outline-none p-2 mb-1'/>
      <input type="file"/>
     </div>
     <div className='mt-4'>
      <h2 className='font-bold text-xl mb-1'>Numbers</h2>
      <textarea className='resize-none w-full h-24 bg-secondary outline-none p-2 mb-1'/>
     </div>
    </div>
  )
}

export default Index