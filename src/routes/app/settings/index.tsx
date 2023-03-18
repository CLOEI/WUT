import { RootState } from '@/redux/store';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { update } from "@/redux/slices/settingsSlice"

type FormData = {
  delay: number;
  sleepAfter: number;
  enableSleep: boolean;
}


function Index() {
  const { register, handleSubmit } = useForm()
  const settings = useSelector((state: RootState) => state.settings)
  const dispatch = useDispatch()

  const onSubmit = ({ delay, sleepAfter, enableSleep }: FormData) => dispatch(update({ delay: +delay, sleepAfter: +sleepAfter, enableSleep }))

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className='text-3xl font-bold mb-6'>Settings</h1>
      <div className='space-y-1'>
        <div>
          <label htmlFor="delay">Send delay : </label>
          <input type="number" id="delay" className='bg-secondary text-center outline-none align-middle' min={0} defaultValue={settings.delay} {...register("delay")}/>
          <span>ms</span>
        </div>
        <div>
          <label htmlFor="sleep-after">Sleep after : </label>
          <input type="number" id="sleep-after" className='bg-secondary text-center outline-none align-middle' min={0} defaultValue={settings.sleepAfter} {...register("sleepAfter")}/>
          <span>message</span>
        </div>
        <div className='mb-4'>
          <label htmlFor="enable-sleep">Enable sleep : </label>
          <input type="checkbox" id="enable-sleep" className='bg-secondary text-center outline-none align-middle' min={0} defaultChecked={settings.enableSleep} {...register("enableSleep")}/>
        </div>
      </div>
      <div className='space-x-1 mt-4'>
        <button type="submit" className='px-4 py-2 bg-secondary rounded-md enabled:active:scale-90'>Save</button>
        <button type="button" className='px-4 py-2 bg-rose-500 rounded-md enabled:active:scale-90'>Reset</button>
      </div>
    </form>
  )
}

export default Index