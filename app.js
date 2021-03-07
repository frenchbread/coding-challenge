const path = require('path')

const Koa = require('koa')
const serve = require('koa-static')
const cors = require('@koa/cors')

const app = new Koa()

const port = process.env.PORT || 8080

app.use(cors())
app.use(serve(path.resolve('dist')))

app.listen(port)
