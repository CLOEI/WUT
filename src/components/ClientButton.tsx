import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ClientStatus from './ClientStatus';

type Props = {
  name: string;
  onClick: (path: string) => void
}

function ClientButton({ name, onClick }: Props) {
  const clients = useSelector((state: RootState) => state.client.clients)
  const { pathname } = useLocation()
  const status = clients[name]?.conStatus

  return (
    <div onClick={() => onClick(pathname)} className='p-2 cursor-pointer space-y-1 w-full border-transparent border-b-2 hover:border-main'>
      <p>{name}</p>
      <div className='flex items-center space-x-2'>
        <ClientStatus status={status || 'close'}/>
        <p className='text-left text-xs font-mono opacity-90'>{status?.charAt(0).toUpperCase() + status?.slice(1) || "Close"}</p>
      </div>
    </div>
  )
}

export default ClientButton