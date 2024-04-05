import cron from 'node-cron'
import { resolve } from 'path'
import { schedule } from '../config'

const initCrons = async () => {
  Object.keys(schedule).forEach((taskName) => {
    const { frecuency, handler } = schedule[taskName]
    console.log('Cron:', handler, 'Running frecuency: ', frecuency)
    if (cron.validate(frecuency)) {
      cron.schedule(frecuency, async () => {
        const module = await import(resolve(handler))
        const currentHandler = module.default || module
        currentHandler()
      })
    }
  })
}

export const scheduler = {
  initCrons,
}
