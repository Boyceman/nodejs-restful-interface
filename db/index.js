import pg from 'pg'
import config from './config'

const pool = pg.Pool(config)

export default class PG {
  static connect () {
    return pool.connect()
  }

  static async helper (sql, value) {
    const connection = await this.connect()
    try {
      const result = await connection.query(sql, value)
      return result
    } catch (err) {
      // todo db disconnect ps: log SMS
      console.log(err, 'err 99999')
    } finally {
      connection.release()
    }
  }

  static parseFields (fields = {}) {
    let field = []
    let value = []
    let idx = []
    let count = 0
    for (let i in fields) {
      count++
      field.push(i)
      value.push(fields[i])
      idx.push('$' + count)
    }
    return { field, idx, value }
  }

  static async create (table, fields) {
    let sql = `INSERT INTO ${table}(`
    const { field, idx, value } = await this.parseFields(fields)
    sql += `${field.join(',')}) VALUES(${idx.join(',')}) RETURNING id`
    return this.helper(sql, value)
  }

  static async read (table, fields) {
    let sql = `SELECT * FROM ${table} WHERE `
    const { field, idx, value } = await this.parseFields(fields)
    if (!field.length || !idx.length) {
      console.error('filed blank')
      return false
    }
    sql += `${field[0]} = ${idx[0]}`
    return this.helper(sql, value)
  }

  static async readList (table, { limit, offset, orderBy }) {
    const sql = `SELECT * FROM ${table} ORDER BY $1 DESC LIMIT $2 OFFSET $3`
    const value = [orderBy, limit, offset]
    // todo desc doesn't work
    return this.helper(sql, value)
  }
}