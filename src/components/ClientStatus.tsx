import { BsFillCircleFill } from "react-icons/bs"

function ClientStatus({ status }: { status: string }) {
  let style = "text-rose-500";
  
  switch (status) {
    case "close":
      style = "text-rose-500";
      break;
    case "open":
      style = "text-green-500";
      break;
    case "connecting":
      style = "text-yellow-500";
      break;
    default:
      break;
  }

  return (
    <BsFillCircleFill size={8} className={style}/>
  )
}

export default ClientStatus