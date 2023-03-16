import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import ClientButton from '@/src/components/ClientButton';

import { RootState } from "@/redux/store"

function Layout() {
  const clients = useSelector((state: RootState) => state.client.clients)
  const navigate = useNavigate();

  return (
    <div className='grid grid-cols-[250px_1fr] h-[calc(100vh-56px)]'>
      <div className='h-full bg-secondary'>
        {Object.values(clients).map((client, i) => {
            return <ClientButton name={client.name} onClick={() => navigate(`/app/broadcast/${client.name}`)} key={i}/>
        })}
      </div>
      <Outlet/>
    </div>
  )
}

export default Layout