import jwt from 'jsonwebtoken'
import { env } from 'process'

export function getToken(payload: any) {
  return jwt.sign(payload, env.SECRET!, {
    expiresIn: '1h',
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
