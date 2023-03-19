import { RootState } from '@/redux/store';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

type FormData = {
  type: string;
  message: string;
  numbers: string;
  media: FileList
}

function Index() {
  const { handleSubmit, register } = useForm();
  const defaultClient = useSelector((state: RootState) => state.client.defaultClient);

  // NOTE : This is just for testing purposes do not use it
  const onSubmit = async ({ media, message, numbers, type}: FormData) => {
    const num = numbers.split("\n");

    for (let i = 0; i < num.length; i++) {
      await api.sendMessage(defaultClient, message, num[i].replace(/\D/g, "")+"@s.whatsapp.net", media[0]?.path)
    }
  };

  return (
    <form className='px-2 overflow-y-auto cus-scrollbar scrollbar-thumb-secondary' onSubmit={handleSubmit(onSubmit)}>
     <div className='flex justify-between'>
      <h1 className='font-bold text-3xl mb-2'>Broadcast</h1>
      <button type='submit' className='bg-secondary px-4 py-2 rounded-md enabled:active:scale-90'>Start</button>
     </div>
     <div className='flex space-x-2'>
      <p>Type : </p>
      <div>
      <div>
          <input type="radio" name="type" id="client" value="client" disabled {...register("type")}/>
          <label htmlFor="client"> By Client</label>
        </div>
        <div>
          <input type="radio" name="type" id="random" value="random" defaultChecked {...register("type")}/>
          <label htmlFor="random"> Random</label>
        </div>
      </div>
     </div>
     <div className='mt-6'>
      <h2 className='font-bold text-xl mb-1'>Message</h2>
      <textarea className='resize-none w-full h-24 bg-secondary outline-none p-2 mb-1' {...register("message")}/>
      <input type="file" {...register("media")}/>
     </div>
     <div className='mt-4'>
      <h2 className='font-bold text-xl mb-1'>Numbers</h2>
      <textarea className='resize-none w-full h-24 bg-secondary outline-none p-2 mb-1' {...register("numbers")}/>
     </div>
    </form>
  )
}

export default Index