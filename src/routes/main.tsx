import React from 'react'
import { AiOutlineWhatsApp, AiOutlineFilter } from "react-icons/ai"
import { BiGroup } from "react-icons/bi"
import { useNavigate } from 'react-router-dom'

function Main() {
  const navigate = useNavigate();

  const gotoclient = () => navigate("/app/client")

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='space-x-2'>
        <button className='bg-secondary p-4 rounded-md active:scale-90' onClick={gotoclient}>
          <AiOutlineWhatsApp />
        </button>
        <button className='bg-secondary p-4 rounded-md opacity-50' disabled>
          <BiGroup />
        </button>
        <button className='bg-secondary p-4 rounded-md opacity-50' disabled>
          <AiOutlineFilter />
        </button>
      </div>
    </div>
  )
}

export default Main