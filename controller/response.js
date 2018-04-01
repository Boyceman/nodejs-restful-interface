export default function(result) {
  let response = {}
  if (typeof result === 'object') {
    response = { ...codeTable[200], result }
  }
  if (typeof result === 'number') {
    response = codeTable[result]
  }
  return response
}

export const codeTable = {
  200: {
    code: 200,
    message: 'success'
  },
  400: {
    code: 400,
    message: 'bad request'
  },
  403: {
    code: 403,
    message: 'forbidden'
  },
  500: {
    code: 500,
    message: 'server error'
  }
}