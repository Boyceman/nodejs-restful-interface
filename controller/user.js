import response from './response'
import { genToken } from '../middleware/auth'

export default class UserController {
  static register (ctx) {
    const { email, password } = ctx.request.body
    if (email && password) {
      let result = genToken({ [email]: password })
      ctx.body = response(result)
    } else {
      ctx.body = response(400)
    }
  }

  static profile (ctx) {
    let result = {}
    ctx.body = response(result)
  }
}