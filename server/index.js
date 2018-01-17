const express = require('express')
const http = require('http')
const multer = require('multer')
const qiniu = require('./qiniu')
const moment = require('moment')
const storage = multer.memoryStorage()
const upload = multer({
  storage: storage
})
const fileSystem = require('fs')
const path = require('path')
const router = express.Router()
const spawnSync = require('child_process').spawnSync
const mysql = require('mysql2')
const pool = mysql.createPool({
  host: '47.94.172.95',
  port: 3306,
  user: 'program_w',
  password: 'KQPp5wrZJG33fwFs',
  database: 'xiaobaods',
  charset: 'UTF8_GENERAL_CI'
})

router.get('/fullviews/chart', (req, res) => {
  const style = req.query.chartStyle
  if (style && style === 'bar') {
    var dateRange = req.query.dateRange
    let data = JSON.parse(spawnSync('python', ['xiaobaods_output', "{'fun':'ps','date':'" + dateRange[0] + "','date_range':'" + dateRange[1] + "'}"], {
      cwd: './server/python/script'
    }).stdout)
    res.send(data)
  } else {
    var storeName = req.query.storeName
    let data = JSON.parse(spawnSync('python', ['xiaobaods_output', "{'fun':'pi','variable':'" + storeName + "'}"], {
      cwd: './server/python/script'
    }).stdout)
    res.send(data)
  }
})
router.get('/fullviews/list', (req, res) => {
  var date = req.query.date
  var data1 = JSON.parse(spawnSync('python', ['xiaobaods_output', "{'fun':'pr','category':'打底裤','date':'" + date + "'}"], {
    cwd: './server/python/script'
  }).stdout)
  var data2 = JSON.parse(spawnSync('python', ['xiaobaods_output', "{'fun':'pr','category':'牛仔裤','date':'" + date + "'}"], {
    cwd: './server/python/script'
  }).stdout)
  var data3 = JSON.parse(spawnSync('python', ['xiaobaods_output', "{'fun':'pr','category':'休闲裤','date':'" + date + "'}"], {
    cwd: './server/python/script'
  }).stdout)
  res.send([data1, data2, data3])
})
router.get('/product', (req, res) => {
  const table = req.query.name === 'hotseller' ? 'bc_attribute_granularity_sales' : 'bc_attribute_granularity_visitor'
  const {
    productStyle: category,
    dateTime: date,
    extraShown: variable,
    timeLen: length,
    pageSize,
    pageCurrent
  } = req.query
  const lineb = pageSize * (pageCurrent - 1)
  const linef = pageSize * pageCurrent
  const parms = "{'fun':'a','table':'" + table + "','date':'" + date + "','line_b':" + lineb + ",'line_f':" + linef + ",'category':'" + category + "','variable':'" + variable + "','length':" + length + '}'
  const spawnSync1 = spawnSync('python', ['xiaobaods.py', parms], {
    cwd: './server/python'
  })
  const data = JSON.parse(spawnSync1.stdout)
  res.send(data)
})
router.get('/world', (req, res) => {
  if (req.query.name === 'flash') {
    const {
      productStyle: category,
      dateTime: date,
      attribute: choice,
      extraShown: variable,
      timeLen: length,
      stepNumbe: head
    } = req.query
    const parms = "{'choice':'" + choice + "','date':'" + date + "','category':'" + category + "','variable':'" + variable + "'head':" + head + ",'length':" + length + '}'
    const spawnSync1 = spawnSync('python', ['xiaobaods_ws.py', parms], {
      cwd: './server/python'
    })
    const data = JSON.parse(spawnSync1.stdout)
    res.send(data)
  } else {
    let name = 'w'
    const {
      productStyle: category,
      dateTime: date,
      attribute: choice,
      extraShown: variable,
      timeLen: length,
      pageSize,
      pageCurrent
    } = req.query
    const lineb = pageSize * (pageCurrent - 1)
    const linef = pageSize * pageCurrent
    const parms = "{'fun':'" + name + "','choice':'" + choice + "','date':'" + date + "','line_b':" + lineb + ",'line_f':" + linef + ",'category':'" + category + "','variable':'" + variable + "','length':" + length + '}'
    const spawnSync1 = spawnSync('python', ['xiaobaods.py', parms], {
      cwd: './server/python'
    })
    const data = JSON.parse(spawnSync1.stdout)
    res.send(data)
  }
})
router.get('/world/attribute.json', (req, res) => {
  const activeName = req.query.name
  fileSystem.readFile('./server/mock.json', (err, data) => {
    if (err) throw err
    else {
      const arr = JSON.parse(data)
      var attributelist = []
      var extraShownlist = []
      arr.map(item => {
        if (item.name === activeName) {
          const extrabase = item.extraShownBase
          attributelist = item.attribute.map((item) => {
            return {
              value: item.value,
              label: item.label
            }
          })
          extraShownlist = item.attribute.map((item) => {
            return [item.label, item.extraShown.concat(extrabase)]
          })
        }
      })
      res.send([extraShownlist, attributelist])
    }
  })
})
router.get('/property', (req, res) => {
  const table = req.query.name === 'hotseller' ? 'bc_attribute_granularity_sales' : 'bc_attribute_granularity_visitor'
  const {
    productStyle: category,
    dateTime: date,
    extraShown: variable,
    timeLen: length,
    classification,
    attributes,
    pageSize,
    pageCurrent
  } = req.query
  const lineb = pageSize * (pageCurrent - 1)
  const linef = pageSize * pageCurrent
  const parms = "{'fun':'c','table':'" + table + "','date':'" + date + "','line_b':" + lineb + ",'line_f':" + linef + ",'category':'" + category + "','variable':'" + variable + "','classification':'" + classification + "','attributes':'" + attributes + "','length':" + length + '}'
  const spawnSync1 = spawnSync('python', ['xiaobaods.py', parms], {
    cwd: './server/python'
  })
  const data = JSON.parse(spawnSync1.stdout)
  res.send(data)
})

router.post('/property-deal', upload.single(), (req, res) => {
  fileSystem.writeFile('./server/uploads/html.txt', req.body.information, (err) => {
    if (err) throw err
    const spawnSync3 = spawnSync('python', ['run.py'], {
      cwd: './server/Business_adviser_parser'
    })
    const data = spawnSync3.stdout.toString()
    fileSystem.writeFile('./server/logers/index.log', data, (err) => {
      if (err) throw err
      else res.send(data)
    })
  })
})
router.get('/weekreport', (req, res) => {
  pool.query('SELECT * FROM week_article ORDER BY id DESC', function (err, result) {
    if (err) throw (err)
    res.send(result)
    // fileSystem.readFile('./server/markdown/' + result[0].name, function (err, data) {
    //   if (err) throw (err)
    //   res.send(data)
    // })
  })
})
router.post('/qiniu/image', upload.single('image'), (req, res) => {
  var file = req.file
  var filepath = `./server/uploads/${file.originalname}`
  var filename = Date.now() + file.originalname
  fileSystem.writeFile(filepath, file.buffer, (err) => {
    if (err) throw err
    qiniu.uploadImgFile(filename, filepath, (respErr, respBody, respInfo) => {
      if (respErr) {
        throw respErr
      }
      if (respInfo.statusCode == 200) {
        fileSystem.unlinkSync(filepath)
        res.send('http://owvj4xfha.bkt.clouddn.com/' + filename)
      } else {
        res.send('上传失败' + respBody)
      }
    })

  })
})
router.post('/weekreport/editor', (req, res) => {
  const {
    mdString,
    title,
    editor,
    date
  } = req.body
  var filename = 'article' + date + '.md'

  qiniu.uploadMdFile(filename, mdString, (respErr, respBody, respInfo) => {
    if (respErr) {
      res.send({
        code: 404,
        msg: '文章上传失败'
      })
    }
    if (respInfo.statusCode == 200) {
      let tag = date.slice(0, 4) +'|' + date.slice(0, 7) +'|'+ date.slice(0, 7).replace(/-/g,' ')
      console.log(tag)
      var escapeData = {
        id: '',
        date: date,
        name: filename,
        title: title,
        editor: editor,
        status: 302,
        readers: 0,
        verifier: '待审核',
        tag:tag
      }
      pool.query('INSERT INTO `week_article` SET ?', escapeData, function (err, result) {
        if (err) throw (err)
        res.send({
          code: 200,
          msg: '文章上传成功'
        })
      })
    } else {
      res.send({
        code: 302,
        msg: '文章已经存在，不能重复上传'
      })
    }
  })
})
router.get('/weekreport/view', (req, resp) => {
  var filedate = moment(req.query.date).format('YYYY-MM-DD')
  var title = req.query.title
  pool.query("SELECT name FROM week_article WHERE date = ? and title = ?", [filedate, title], function (err, result) {
    if (err) throw (err)
    var urlsToPrefetch = 'http://owvh3ep5x.bkt.clouddn.com/' + Object.values(result[0])
    http.get(urlsToPrefetch, (res) => {
      var rawData = ''
      res.setEncoding('utf8')
      res.on('data', (chunk) => {
        rawData += chunk
      })
      res.on('end', () => {
        resp.send([title, rawData])
      })
    })
  })
})
router.get('/weekreport/filter', (req, res) => {
  var tags = req.query.tags
  var clearsql = "SELECT * FROM week_article"
  var filtersql = "SELECT * FROM week_article WHERE tag LIKE "+ pool.escape('%'+req.query.tags+'|%')
  var sql = tags ==='' ? clearsql : filtersql
  pool.query(sql, function (err, result) {
    if (err) throw (err)
    res.send(result)
  })
})
router.get('/tool-box', (req, res) => {
  let product = req.query.name === 'betatest' ? req.query.product : ''

  pool.query('SELECT * FROM `Tools_conversion` WHERE `category` = ?', [product], function (err, results, fields) {
    if (err) throw err
    else {
      res.send(results[0])
    }
  })
})
router.get('/property-deal-list', (req, res) => {

  const {date,attribute,variable,category} = req.query
  var string = "{'date':'" + date + "','category':'" + category + "','attribute':'" + attribute + "','variable':'" + variable + "'}"
  const spawnSync1 = spawnSync('python', ['xiaobaods_e.py', string],{cwd:'./server/python'})
  var data = JSON.parse(spawnSync1.stdout)
  var size = Buffer.byteLength(spawnSync1.stdout)
  
  res.send({
    size:size,
    data: data
  })
})
router.get('/property-deal-trend', (req, res) => {
  var query = req.query
  if (query.attribute == 'list' || query.feature == 'list') {
    var string = JSON.stringify(query).replace(/\"/g, "'")
    const spawnSync1 = spawnSync('python', ['xiaobaods_et.py', string],{cwd:'./server/python'})
    var data = JSON.parse(spawnSync1.stdout)
    res.send({
      data: data
    })
  } else {
    var string0 = "{'category':'" + query.category + "','attribute':'" + query.attribute + "','variable':'" + query.variable + "','feature':'all'}"
    var string1 = "{'category':'" + query.category + "','attribute':'" + query.attribute + "','variable':'" + query.variable + "','feature':'" + query.feature + "','stats':0}"
    var string2 = "{'category':'" + query.category + "','attribute':'" + query.attribute + "','variable':'" + query.variable + "','feature':'" + query.feature + "','stats':1}"
    const spawnSync0 = spawnSync('python', ['xiaobaods_et.py', string0],{cwd:'./server/python'})
    const spawnSync1 = spawnSync('python', ['xiaobaods_et.py', string1],{cwd:'./server/python'})
    const spawnSync2 = spawnSync('python', ['xiaobaods_et.py', string2],{cwd:'./server/python'})

    var data0 = JSON.parse(spawnSync0.stdout)
    var data1 = JSON.parse(spawnSync1.stdout)
    var data2 = JSON.parse(spawnSync2.stdout)
 
    res.send({
      data0: data0,
      data1: data1,
      data2: data2
    })
  }
})
module.exports = router
