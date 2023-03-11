import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import ClientStatus from './ClientStatus';

function ClientButton({ name }: { name: string }) {
  const clients = useSelector((state: RootState) => state.client.clients)
  const status = clients[name]?.conStatus
  const navigate = useNavigate()

  return (
    <div onClick={() => navigate(`/app/client/${name}`)} className='p-2 cursor-pointer space-y-1 w-full border-transparent border-b-2 hover:border-main'>
      <p>{name}</p>
      <div className='flex items-center space-x-2'>
        <ClientStatus status={status || 'close'}/>
        <p className='text-left text-xs font-mono opacity-90'>{status?.charAt(0).toUpperCase() + status?.slice(1) || "Close"}</p>
      </div>
    </div>
  )
}

export default ClientButton