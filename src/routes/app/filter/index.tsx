import { RootState } from "@/redux/store";
import { useState } from "react"
import { useSelector } from "react-redux";
import toast from "react-hot-toast"

function Index() {
  const client = useSelector((state: RootState) => state.client)
  const [loading, setLoading] = useState(false)
  const [numbers, setNumbers] = useState([])
  const [filtered, setFiltered] = useState({
    valid : [],
    invalid: []
  })


  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNumbers(e.target.value.split("\n"));
  }

  const checkNumbers = async () => {
    if (numbers.length > 0) {
      setLoading(true)
      const toastId = toast.loading("Filtering...")
      const checked = await api.checkOnWhatsApp(client.defaultClient, numbers)

      const valid = [], invalid = [];

      for (const data of checked) {
        if(data.exist) valid.push(data.number)
        else invalid.push(data.number)
      }
      
      setFiltered({
        valid,
        invalid
      })
      setLoading(false)
      toast.success(`${valid.length} valid | ${invalid.length} invalid`, { id: toastId })
    }
  }

  const removeDuplicates = () => {
    const newData = [...new Set(filtered.valid)];
    toast.success(`Removed ${filtered.valid.length - newData.length} duplicate`)
    setFiltered((state) => ({
      ...state,
      valid: newData
    }))
  }

  return (
    <div className="h-full flex justify-center p-10 items-center">
      <div className="h-full flex flex-col">
        <p>Total : {numbers.length}</p>
        <textarea onChange={onChange} className="resize-none flex-grow bg-secondary outline-none cus-scrollbar"/>
      </div>
      <div className="mx-4 space-y-2">
        <button onClick={checkNumbers} disabled={loading || !(client.defaultClient && client.clients[client.defaultClient].conStatus == "open")} className="bg-secondary px-4 py-2 rounded-md enabled:active:scale-90 block w-full disabled:opacity-50">Check</button>
        <button onClick={removeDuplicates} disabled={filtered.valid.length === 0} className="bg-secondary px-4 py-2 rounded-md enabled:active:scale-90 block w-full disabled:opacity-50">Remove Duplicate</button>
      </div>
      <div className="h-full flex flex-col mr-2">
        <p>Valid : {filtered.valid.length}</p>
        <textarea className="resize-none flex-grow bg-secondary outline-none cus-scrollbar" readOnly value={filtered.valid.join("\n")}/>
      </div>
      <div className="h-full flex flex-col">
        <p>Invalid : {filtered.invalid.length}</p>
        <textarea className="resize-none flex-grow bg-secondary outline-none cus-scrollbar" readOnly value={filtered.invalid.join("\n")}/>
      </div>
    </div>  
  )
}

export default Index