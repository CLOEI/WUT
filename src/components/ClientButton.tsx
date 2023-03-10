import { newClient } from '@/redux/slices/clientSlice';
import { RootState } from '@/redux/store';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { BsFillCircleFill } from "react-icons/bs"

function ClientButton({ name }: { name: string }) {
  const clients = useSelector((state: RootState) => state.client)
  const navigate = useNavigate()

  return (
    <div onClick={() => navigate(`/app/client/${name}`)} className='p-2 cursor-pointer space-y-1 w-full border-transparent border-b-2 hover:border-main'>
      <p>{name}</p>
      <div className='flex items-center space-x-2'>
        {clients[name].conStatus === "close" && <BsFillCircleFill size={8} className="text-rose-500"/>}
        {clients[name].conStatus === "connecting" && <BsFillCircleFill size={8} className="text-yellow-500"/>}
        {clients[name].conStatus === "open" && <BsFillCircleFill size={8} className="text-green-500"/>}
        <p className='text-left text-xs font-mono opacity-90'>{clients[name]?.conStatus || "Connecting"}</p>
      </div>
    </div>
  )
}

export default ClientButton