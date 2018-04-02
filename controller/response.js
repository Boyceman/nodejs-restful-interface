export default function(result) {
  return typeof result === 'object' ? { ...codeTable[200], result } : codeTable[result]
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