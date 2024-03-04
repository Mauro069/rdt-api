import { Request, Response, NextFunction } from 'express'
import fileUpload from 'express-fileupload'

export function uploadMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads',
  })(req, res, next)
}
