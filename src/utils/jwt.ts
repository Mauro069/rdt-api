import jwt from 'jsonwebtoken'
import { env } from '../config'

export function getToken(payload: any) {
  return jwt.sign(payload, env.SECRET!, {
    expiresIn: env.JWT_EXPIRE_TIME,
  })
}

export function getTokenData(token: string): any {
  let data = null
  jwt.verify(
    token,
    env.SECRET!,
    (err: jwt.VerifyErrors | null, decoded: any) => {
      if (err) {
        console.log('Error al obtener data del token')
      } else {
        data = decoded
      }
    }
  )

  return data
}

export function isValidToken(token: string): any {
  let isValid = false
  jwt.verify(token, env.SECRET!, (err, decoded) => {
    if (!err) {
      isValid = true
    }
  })
  return isValid
}
