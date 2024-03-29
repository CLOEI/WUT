import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import ClientButton from '@/src/components/ClientButton';

import { RootState } from "@/redux/store"

function Layout() {
  const clients = useSelector((state: RootState) => state.client.clients)
  const navigate = useNavigate()

  return (
    <div className='grid grid-cols-[250px_1fr] h-[calc(100vh-64px)] px-2'>
      <div className='h-full bg-secondary'>
        {Object.values(clients).map((client, i) => {
          const onClick = (path: string) => !(path === `/app/broadcast/${client.name}`) && navigate(`/app/broadcast/${client.name}`)
          return <ClientButton name={client.name} onClick={onClick} key={i}/>
        })}
      </div>
      <Outlet/>
    </div>
  )
}

export default Layout