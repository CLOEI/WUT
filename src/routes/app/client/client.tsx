import { QRCodeSVG } from 'qrcode.react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

import { RootState } from "@/redux/store"

function Client() {
  const { id } = useParams()
  const client = useSelector((state: RootState) => state.client[id])

  console.log(client)

  return (
    <div className='flex justify-items-center items-center'>
      {client?.qr && <div className="bg-white p-1 h-auto w-full max-w-[250px] mx-auto"><QRCodeSVG value={client?.qr} className="h-auto max-w-full w-full"/></div>}
      {client?.data && 
        <div className='place-self-start px-2'>
          <h1 className='font-bold text-3xl'>{client.data.id}</h1>     
          <h2>Name : {client.data.name || "Syncing"}</h2>
        </div>
      }
    </div>
  )
}

export default Client