const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const session = require('express-session')
const serveStatic = require('serve-static')
// const history = require('connect-history-api-fallback')
const app = express()

// app.use(history())
app.use(serveStatic(path.join(__dirname, 'dist')))
app.use(cookieParser())
app.use(session({
    secret: 'xiaobaods shujuzu',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true ,maxAge: 14400000}
  }))
app.use(bodyParser.urlencoded({ extended: true, limit:'10mb'}))
app.use(bodyParser.json({limit:'10mb'}))
app.use(require('./server/index'))
app.get('/', (req, res)=> {
    res.render('index')
})
app.listen('3000',()=>console.log('正在运行3000..'))