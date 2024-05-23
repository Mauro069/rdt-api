import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { getSearhParams } from '../../utils/getSearhParams'
import { getOptions } from '../../utils/getOptions'
import { UserModel } from '../../models/user.model'
import { userType } from '../../utils/constants'

export async function getUsers(req: Request, res: Response): Promise<void> {
  try {
    //?limit=10&page=10
    const { searchParam, isValid } = getSearhParams(req, UserModel.schema.obj)

    if (!isValid) {
      res.status(401).json({ message: messages.error.notAllowParams })
      return
    }

    //@ts-ignore
    const options = getOptions(req, UserModel.schema.obj)

    const sortedOptions = {
      ...options,
    }

    if (typeof req.query.userType === 'string') {
      // @ts-ignore
      searchParam.userType = req.query.userType
    } else {
      // @ts-ignore
      searchParam.userType = { $ne: userType.ADMIN } // Excluir trabajos con estado DELETED
    }

    // @ts-ignore
    const users = await UserModel.paginate({ ...searchParam }, sortedOptions)

    if (!users || users.docs.length === 0) {
      res.status(200).json([])
      return
    }

    //@ts-ignore
    const sanitizedDocs = users.docs.map((user) => {
      const { _id, password, code, __v, ...rest } = user.toObject()
      return { ...rest, id: _id }
    })

    res.status(200).json({
      users: {
        ...users,
        docs: sanitizedDocs,
      },
    })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
