import { codeTable } from '../controller/response'
import fs from 'fs'
import jwt from 'jsonwebtoken'

export default () => {
  return async ({ request, originalUrl }, next) => {
    await next()
    if (whiteList.indexOf(originalUrl) < 0) {
      const { header: { authentication } } = request
      if (verifyToken(authentication)) {
        // todo get data from DB
      } else {
        return codeTable[403]
      }
    }
  }
}

export function genToken (info) {
  const cert = fs.readFileSync('private.key')
  const token = jwt.sign(info, cert, { expiresIn: '1h' })
  return { token }
}

export function verifyToken (token) {
  const cert = fs.readFileSync('private.key')
  const decode = jwt.verify(token, cert)
  // todo return true or false depending on got password by email from DB
  return true
}

const whiteList = ['/api/v1/usedr/register', '/api/v1/user/login']