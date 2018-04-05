import response from './response'
import PG from '../db'

export default class ContentController {
  static async list (ctx) {
    // todo add follow user_id filter
    const { query } = ctx.request
    if (query) {
      const { pageNum = 1, pageSize = 10 } = query
      const { rows } = await PG.readList('media', {
        orderBy: 'created_time',
        limit: pageSize,
        offset: pageSize * (pageNum - 1)
      })
      if (rows.length) {
        ctx.body = response(rows)
      } else {
        ctx.body = response(0)
      }
    } else {
      ctx.body = response(400)
    }
  }
}