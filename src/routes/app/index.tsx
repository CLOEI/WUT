import React, { useEffect } from 'react'
import { AiOutlineLeft } from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'

import { Client, upCon } from "@/redux/slices/clientSlice"

function Index() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    api.onConnection((data: Client) => {
      dispatch(upCon(data))
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