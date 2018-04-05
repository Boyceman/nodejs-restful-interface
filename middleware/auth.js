import response from '../controller/response'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import PG from '../db'
import { hashMd5 } from '../utils/index'

export default () => {
  return async (ctx, next) => {
    if (ctx.originalUrl.split('/')[1] === 'api' && whiteList.indexOf(ctx.originalUrl) < 0) {
      const { header: { authorization } } = ctx.request
      const response = await verifyToken(authorization)
      if (typeof response === 'boolean') {
        await next()
      } else {
        ctx.body = response
      }
    } else {
      await next()
    }
  }
}

export function genToken (info) {
  const cert = fs.readFileSync('private.key')
  const token = jwt.sign(info, cert, { expiresIn: '1h' })
  return { token }
}

export async function verifyToken (token) {
  const cert = fs.readFileSync('private.key')
  try {
    const { email, password } = jwt.verify(token, cert)
    const { rows } = await PG.read('user_auths', { 'identifier': email })
    const md5pwd = rows[0].credential
    if (md5pwd === hashMd5(password)) {
      return true
    }
  } catch ({ name, message, ...others }) {
    console.log(`${name}: ${message}`)
    if (name === 'TokenExpiredError') {
    }
    if (name === 'JsonWebTokenError') {
    }
    return response(403)
  }
}

const whiteList = ['/api/v1/user/register', '/api/v1/user/login']