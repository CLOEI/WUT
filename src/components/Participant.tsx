import { GroupParticipant } from "@adiwajshing/baileys"
import { useEffect, useState } from "react"
import { RxAvatar } from "react-icons/rx"

type Props = {
  data: GroupParticipant,
  client: string
}

function Participant({ data, client }: Props) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.getProfileUrl(client, data.id).then(data => setProfile(data))
      .catch(_ => {
        return;
      })
  }, [])

  return (
    <div className="flex space-x-1">
      {profile && <img src={profile}/>}
      {!profile && <RxAvatar size={96}/>}
      <p>{data.id}</p>
    </div>
  )
}

export default Participant