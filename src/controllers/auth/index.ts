import { login } from './login'
import { register } from './register'
import { registerApplicant } from './registerApplicant'
import { registerCompany } from './registerCompany'
import { confirm } from './confirm'
import { changePassword } from './changePassword'

export const AuthController = {
  register,
  registerApplicant,
  registerCompany,
  login,
  confirm,
  changePassword,
}
