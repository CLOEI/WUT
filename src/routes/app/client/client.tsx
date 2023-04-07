import { QRCodeSVG } from 'qrcode.react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

import { RootState } from "@/redux/store"
import { setDefault, remClient } from "@/redux/slices/clientSlice"
import { useEffect, useState } from 'react';

function Client() {
  const { id } = useParams();
  const clients = useSelector((state: RootState) => state.client);
  const [profile, setProfile] = useState(null);
  const client = clients.clients[id]
  const dispatch = useDispatch();

  const setasDefault = async () => {
    dispatch(setDefault(id))
  }

  const logout = async () => {
    dispatch(remClient(id))
    await api.logoutClient(id)
  }

  useEffect(() => {
    api.getProfileUrl(clients.defaultClient, client.data.id)
      .then(res => setProfile(res))
  }, [])

  return (
    <div className='flex justify-items-center items-center'>
      {client?.qr && <div className="bg-white p-1 h-auto w-full max-w-[250px] mx-auto"><QRCodeSVG value={client?.qr} className="h-auto max-w-full w-full"/></div>}
      {client?.data && 
        <div className='place-self-start px-2 flex justify-between w-full'>
          <div>
            <h1 className='font-bold text-3xl'>Number : <span className='font-mono opacity-75'>+{client.data.id.split(":")[0]}</span></h1>     
            <h2>Name : <span className='font-mono opacity-75'>{client.data.name || "Loading"}</span></h2>
            <div className='space-x-2'>
              <button onClick={logout} className='rounded-md px-4 py-2 bg-rose-500 enabled:active:scale-90 mt-2'>Logout</button>
              <button onClick={setasDefault} className='rounded-md px-4 py-2 bg-secondary enabled:active:scale-90 mt-2 disabled:opacity-50 disabled:cursor-not-allowed' disabled={clients.defaultClient === id}>Set as default</button>
            </div>
          </div>
          <div>
            <img src={profile} />
          </div>
        </div>
      }
    </div>
  )
}

export default Client