import { login } from './login'
import { register } from './register'
import { registerApplicant } from './registerApplicant'
import { registerCompany } from './registerCompany'
import { confirm } from './confirm'
import { changePassword } from './changePassword'
import { verifyToken } from './verifyToken'
import { forgotPassword } from './forgotPassword'
import { forgotConfirm } from './forgotConfirm'

export const AuthController = {
  register,
  registerApplicant,
  registerCompany,
  login,
  confirm,
  changePassword,
  verifyToken,
  forgotPassword,
  forgotConfirm,
}
