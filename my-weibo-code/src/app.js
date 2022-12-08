const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

// routes 
const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app) // 错误处理 打印到页面

// middlewares 
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
})) // 解析数据
app.use(json()) // 解析json
app.use(logger()) // 日志
app.use(require('koa-static')(__dirname + '/public')) // 静态资源

app.use(views(__dirname + '/views', {
  extension: 'ejs'
})) // 视图  ejs

// logger
// app.use(async (ctx, next) => {
//   // 记录日志 演示 手写的一个
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes 
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
}); // 错误处理

module.exports = app
