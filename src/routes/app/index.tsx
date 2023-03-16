import { AiOutlineLeft } from 'react-icons/ai'
import { Outlet, useNavigate } from 'react-router-dom'

function Index() {
  const navigate = useNavigate();

  const goBack = () => navigate("/");

  return (
    <div className='p-2 h-screen flex flex-col'>
      <div>
        <button onClick={goBack} className="active:scale-90 active:bg-secondary rounded-md p-4">
          <AiOutlineLeft/>
        </button>
      </div>
      <Outlet/>
    </div>
  )
}

export default Index