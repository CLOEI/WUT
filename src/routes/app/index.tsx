import { useEffect } from 'react'
import { AiOutlineLeft } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'

import { Client, upCon, setDefault, remClient } from "@/redux/slices/clientSlice"
import { RootState } from '@/redux/store';

function Index() {
  const defaultClient = useSelector((state: RootState) => state.client.defaultClient)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    api.onConnection((data: Client) => {
      if(data.data && !defaultClient) {
        dispatch(setDefault(data.name))
      }
      dispatch(upCon(data))
    })

    api.onRemoved((name: string) => {
      dispatch(remClient(name))
    })
  }, [])

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