import { Request, Response } from 'express'

import { messages } from '../../utils/messages'
import { LanguageModel } from '../../models/language.model'

export async function getLanguage(req: Request, res: Response): Promise<void> {
  try {
    const params = req.params

    const { languageId } = params

    let existingLanguage = await LanguageModel.findOne({
      _id: languageId,
    }).populate('competence')

    if (!existingLanguage) {
      res.status(404).json({ message: messages.error.languageNotFound })
      return
    }

    res.status(200).json({ existingLanguage })
  } catch (error) {
    res.status(500).json({ message: messages.error.generic, error })
  }
}
