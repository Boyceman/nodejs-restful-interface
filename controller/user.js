import response from './response'
import { genToken } from '../middleware/auth'
import { hashMd5 } from '../utils'
import PG from '../db'

export default class UserController {
  static async register (ctx) {
    const { email, password } = ctx.request.body
    if (email && password) {
      const { rows } = await PG.create('users', { nickname: 'boyce' })
      const userId = rows[0].id
      // app's inner
      const md5pwd = hashMd5(password)
      await PG.create('user_auths', {
        user_id: userId,
        identity_type: 'email',
        identifier: email,
        credential: md5pwd
      })
      let result = genToken({ email, password })
      ctx.body = response(result)
    } else {
      ctx.body = response(400)
    }
  }

  static async profile (ctx) {
    const { params: { id } } = ctx
    let result = {}
    if (id) {
      const { rows } = await PG.read('users', { id })
      result = rows[0]
    }
    ctx.body = response(result)
  }
}