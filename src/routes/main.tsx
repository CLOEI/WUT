import { AiOutlineWhatsApp, AiOutlineFilter, AiOutlineSetting } from "react-icons/ai"
import { BiGroup } from "react-icons/bi"
import { BsBroadcast } from "react-icons/bs"
import { useNavigate } from 'react-router-dom'

function Main() {
  const navigate = useNavigate();

  const gotoClient = () => navigate("/app/client")
  const gotoGroup = () => navigate("/app/group")
  const gotoFilter = () => navigate("/app/filter");
  const gotoBC = () => navigate("/app/broadcast");
  const gotoSettings = () => navigate("/app/settings");

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='space-x-2'>
        <button onClick={gotoClient} className='menu-button'>
          <AiOutlineWhatsApp />
        </button>
        <button onClick={gotoGroup} className='menu-button'>
          <BiGroup />
        </button>
        <button onClick={gotoFilter} className='menu-button'>
          <AiOutlineFilter />
        </button>
        <button onClick={gotoBC} className='menu-button' disabled>
          <BsBroadcast />
        </button>
        <button onClick={gotoSettings} className='menu-button'>
          <AiOutlineSetting />
        </button>
      </div>
    </div>
  )
}

export default Main