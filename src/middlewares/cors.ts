import cors from 'cors'

import { messages } from '../utils/messages'

const ACCEPTED_ORIGINS = ['*']

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      //por ahora dejo pasar todo despues hay que volar la linea 11
      return callback(null, true)

      if (acceptedOrigins.includes(origin as string))
        return callback(null, true)

      if (!origin) return callback(null, true)

      return callback(new Error(messages.error.notAllowByCors))
    },
  })
