import { useLocation } from 'react-router-dom'

type Props = {
  name: string
  onClick: (path: string) => void
}

function GroupButton({ name, onClick }: Props) {
  const { pathname } = useLocation()

  return (
    <div onClick={() => onClick(pathname)} className='p-2 cursor-pointer space-y-1 w-full border-transparent border-b-2 hover:border-main'>
      <p>{name}</p>
    </div>
  )
}

export default GroupButton