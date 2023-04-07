import { RootState } from '@/redux/store';
import Participant from '@/src/components/Participant';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function Group() {
  const client = useSelector((state: RootState) => state.client.defaultClient)
  const [metadata, setMetadata] = useState<null|GroupMetadata>(null);
  const { id } = useParams();

  useEffect(() => {
    api.getGroup(client, id)
      .then(data => setMetadata(data))
  }, [id])

  return (
    <div className='overflow-y-auto cus-scrollbar pl-2 scrollbar-thumb-secondary'>
      {metadata && (
        <>
          <h1 className='font-bold text-2xl'>{metadata.subject}</h1>
          <p>Size : {metadata.size}</p>
          <p className='high-text'>{metadata.desc}</p>
          <div className='mt-2'>
            <p>Participants :</p>
            {metadata.participants.map((participant) => <Participant key={participant.id} data={participant} client={client}/>)}
          </div>
        </>
      )}
    </div>
  )
}

export default Group