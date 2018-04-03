export default function(result) {
  return typeof result === 'object' ? { ...codeTable[200], result } : codeTable[result]
}

export const codeTable = {
  200: {
    code: 200,
    message: 'success'
  },
  204: {
    code: 204,
    message: 'wrong password'
  },
  400: {
    code: 400,
    message: 'bad request'
  },
  403: {
    code: 403,
    message: 'forbidden'
  },
  404: {
    code: 404,
    message: 'not found'
  },
  409: {
    code: 409,
    message: 'conflict'
  },
  500: {
    code: 500,
    message: 'server error'
  }
}