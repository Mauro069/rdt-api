import { env } from '../config'

export default () => {
  console.log('---------------------')
  console.log(
    'Borrando avisos con vigencia > a dias = ',
    env.SCHEDULE_INACTIVE_DURATION
  )
}
