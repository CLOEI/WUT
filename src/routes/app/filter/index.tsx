import { RootState } from "@/redux/store";
import { useState } from "react"
import { useSelector } from "react-redux";

function Index() {
  const client = useSelector((state: RootState) => state.client.defaultClient)
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
      const checked = await api.checkOnWhatsApp(client, numbers)

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
    }
  }

  return (
    <div className="h-full flex justify-center p-10 items-center">
      <div className="h-full flex flex-col">
        <p>Total : {numbers.length}</p>
        <textarea onChange={onChange} className="resize-none flex-grow bg-secondary outline-none cus-scrollbar"/>
      </div>
      <div className="mx-4 space-y-2">
        <button onClick={checkNumbers} disabled={loading || !client} className="bg-secondary px-4 py-2 rounded-md enabled:active:scale-90 block w-full disabled:opacity-50">Check</button>
        <button className="bg-secondary px-4 py-2 rounded-md enabled:active:scale-90 block w-full opacity-50" disabled>Copy valid</button>
        <button className="bg-secondary px-4 py-2 rounded-md enabled:active:scale-90 block w-full opacity-50" disabled>Copy invalid</button>
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