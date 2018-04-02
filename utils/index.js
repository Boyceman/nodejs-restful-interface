export function hashMd5 (string) {
  const crypto = require('crypto')
  const md5 = crypto.createHash('md5')
  md5.update(string)
  return md5.digest('hex')
}