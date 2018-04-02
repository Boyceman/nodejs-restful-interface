export default {
  user: 'postgres',
  database: 'test',
  password: '123456',
  port: 5432,

  // 扩展属性
  max: 20, // 连接池最大连接数
  idleTimeoutMillis: 30000 // 连接最大空闲时间 30s
}