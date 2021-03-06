import Koa from 'koa'
import router from './routes'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import cors from 'koa2-cors'
import auth from './middleware/auth'

const app = new Koa()
const port = 5000

app.use(logger())
  .use(bodyParser())
  .use(cors({ maxAge: 3600 }))
  .use(auth())
  .use(router.routes())
  .use(router.allowedMethods())

app.use(ctx => {
  ctx.body = '<html><h1>hello world</h1></html>'
})

app.listen(port, () => console.log(`listening at port ${port}`))
