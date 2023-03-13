import { AiOutlineWhatsApp, AiOutlineFilter } from "react-icons/ai"
import { BiGroup } from "react-icons/bi"
import { useNavigate } from 'react-router-dom'

function Main() {
  const navigate = useNavigate();

  const gotoclient = () => navigate("/app/client")
  const gotoFilter = () => navigate("/app/filter");

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='space-x-2'>
        <button onClick={gotoclient} className='bg-secondary p-4 rounded-md active:scale-90'>
          <AiOutlineWhatsApp />
        </button>
        <button onClick={null} className='bg-secondary p-4 rounded-md opacity-50' disabled>
          <BiGroup />
        </button>
        <button onClick={gotoFilter} className='bg-secondary p-4 rounded-md active:scale-90'>
          <AiOutlineFilter />
        </button>
      </div>
    </div>
  )
}

export default Main