import { RootState } from '@/redux/store';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { update, SettingsState, reset } from "@/redux/slices/settingsSlice"

function Index() {
  const { register, handleSubmit, reset: formReset } = useForm()
  const settings = useSelector((state: RootState) => state.settings)
  const dispatch = useDispatch()

  const onSubmit = (data: SettingsState) => {
    const { minDelay, maxDelay, sleepAfter, ...args } = data
    dispatch(update({ minDelay: +minDelay, maxDelay: +maxDelay, sleepAfter: +sleepAfter, ...args }))
  }

  const doReset = () => {
    dispatch(reset())
    formReset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className='text-3xl font-bold mb-6'>Settings</h1>
      <div className='space-y-1 grid grid-cols-2'>
        <div>
          <h2 className='font-bold text-xl mb-1'>Delay</h2>
          <div className='space-y-1 high-text'>
            <div>
              <label htmlFor="min-delay">Min delay : </label>
              <input type="number" id="min-delay" className='bg-secondary text-center outline-none align-middle' min={0} defaultValue={settings.minDelay} {...register("minDelay")}/>
              <span> ms</span>
            </div>
            <div>
              <label htmlFor="max-delay">Max delay : </label>
              <input type="number" id="max-delay" className='bg-secondary text-center outline-none align-middle' min={0} defaultValue={settings.maxDelay} {...register("maxDelay")}/>
              <span> ms</span>
            </div>
            <div>
              <label htmlFor="sleep-after">Sleep after : </label>
              <input type="number" id="sleep-after" className='bg-secondary text-center outline-none align-middle' min={0} defaultValue={settings.sleepAfter} {...register("sleepAfter")}/>
              <span> message</span>
            </div>
          </div>
        </div>
        <div>
          <h2 className='font-bold text-xl mb-1'>Utils</h2>
          <div className='space-y-1 high-text'>
            <div>
              <label htmlFor="enable-sleep">Enable sleep : </label>
              <input type="checkbox" id="enable-sleep" className='bg-secondary text-center outline-none align-middle' min={0} defaultChecked={settings.enableSleep} {...register("enableSleep")}/>
            </div>
            <div>
              <label htmlFor="enable-btg">Broadcast to group : </label>
              <input type="checkbox" id="enable-btg" className='bg-secondary text-center outline-none align-middle' min={0} defaultChecked={settings.enableBTG} {...register("enableBTG")}/>
            </div>
          </div>
        </div>
      </div>
      <div className='space-x-1 mt-4'>
        <button type="submit" className='px-4 py-2 bg-secondary rounded-md enabled:active:scale-90'>Save</button>
        <button onClick={doReset} type="button" className='px-4 py-2 bg-rose-500 rounded-md enabled:active:scale-90'>Reset</button>
      </div>
    </form>
  )
}

export default Index