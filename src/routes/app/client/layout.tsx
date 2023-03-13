import ClientButton from '@/src/components/ClientButton';
import { AiOutlinePlus } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { nanoid } from 'nanoid'

import { RootState } from "@/redux/store"
import { newClient } from '@/redux/slices/clientSlice';

function Layout() { 
  const clients = useSelector((state: RootState) => state.client.clients)
  const dispatch = useDispatch();

  const addClient = async () => {
    const name = nanoid();

    dispatch(newClient({ name }))
    api.createClient(name)
  }

  return (
    <div className='grid grid-cols-[250px_1fr] h-full'>
      <div className='h-full bg-secondary'>
        <div className='py-2 h-[calc(100vh-104px)] overflow-y-auto cus-scrollbar'>
          {Object.values(clients).map((client, i) => {
            return <ClientButton name={client.name} key={i}/>
          })}
        </div>
        <button onClick={addClient} className='bg-main w-full flex justify-center items-center py-2 whitespace-nowrap space-x-1 active:scale-90'>
          <AiOutlinePlus/>
          <span>New client</span>
        </button>
      </div>
      <Outlet/>
    </div>
  )
}

export default Layout