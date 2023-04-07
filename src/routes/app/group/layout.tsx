import { RootState } from '@/redux/store'
import GroupButton from '@/src/components/GroupButton';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom';

function Layout() {
  const client = useSelector((state: RootState) => state.client.defaultClient);
  const [groups, setGroups] = useState<null|{[_:string]:GroupMetadata}>(null);
  const navigate = useNavigate()

  useEffect(() => {
    api.getGroups(client).then(data => setGroups(data))
  }, [])

  return (
    <div className='h-full px-2'>
      <div className='py-2'>
        <h1>Client ID : <span className='font-bold'>{client}</span></h1>
      </div>
      <div className="grid grid-cols-[250px_1fr] h-[calc(100vh-112px)] overflow-hidden">
        <div className='overflow-y-auto cus-scrollbar bg-secondary'>
          {groups && Object.entries(groups).map((group, i) => {
            const onClick = (path: string) => !(path === `/app/group/${group[0]}`) && navigate(`/app/group/${group[0]}`);
            return <GroupButton key={i} name={group[1].subject} onClick={onClick}/>
          })}
        </div>
        <Outlet/>
      </div>
    </div>
  )
}

export default Layout