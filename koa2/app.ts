import Koa from 'koa'
import views from 'koa-views'
import json from 'koa-json'
import onError from 'koa-onerror'
import koaBody from 'koa-body'
import logger from 'koa-logger'
import sesstion from 'koa-generic-session'
import redisStore from 'koa-redis'
import redisConfig from './config/redis'
import koaMorgan from 'koa-morgan'

import fs from 'fs'
import path from 'path'

import user from './routes/user'
import blog from './routes/blog'

const app = new Koa()
const { NODE_ENV } = process.env

// error handler
onError(app)

// middlewares
app
  .use(koaBody())
  .use(json())
  .use(logger())
  .use(require('koa-static')(__dirname + '../public'))
  .use(views(__dirname + '/views', {
    extension: 'pug'
  }))

//section
app.keys = ['wanglaoban']
app.use(sesstion({
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24
  },
  store: redisStore({
    all: redisConfig
  })
}))

//logger
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
if (NODE_ENV === 'dev') {
  app.use(koaMorgan('dev'))
} else {
  const logFilename = path.resolve(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFilename, {
    flags: 'a'
  })
  app.use(koaMorgan('combined', {
    stream: writeStream
  }))
}

//routes
app
  .use(blog.routes()).use(blog.allowedMethods())
  .use(user.routes()).use(user.allowedMethods())

// error - handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

export default app
