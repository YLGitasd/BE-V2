const express = require('express')
const multer = require('multer')
// const qiniu = require('./qiniu')
const storage = multer.memoryStorage()
const upload = multer({
  storage: storage
})
const fileSystem = require('fs')
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

router.get('/fullviews', (req, res) => {
  const style = req.query.chartStyle
  if (style && style === 'bar') {
    var dateRange = req.query.dateRange
    let data = JSON.parse(spawnSync('python', ['xiaobaods_output', "{'fun':'ps','date':'" + dateRange[0] + "','date_range':'" + dateRange[0] + "'}"], {
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
  const {productStyle: category, dateTime: date, extraShown: variable, timeLen: length, classification, attributes, pageSize, pageCurrent} = req.query
  const lineb = pageSize * (pageCurrent - 1)
  const linef = pageSize * pageCurrent
  const parms = "{'fun':'c','table':'" + table + "','date':'" + date + "','line_b':" + lineb + ",'line_f':" + linef + ",'category':'" + category + "','variable':'" + variable + "','classification':'" + classification + "','attributes':'" + attributes + "','length':" + length + '}'
  const spawnSync1 = spawnSync('python', ['xiaobaods.py', parms], {
    cwd: './server/python'
  })
  const data = JSON.parse(spawnSync1.stdout)
  res.send(data)
})
router.get('/property-deal', (req, res) => {
  const spawnSync1 = spawnSync('python', ['xiaobaods_e.py', "{'attribute':'list'}"], {
    cwd: './server/python'
  })
  const data = JSON.parse(spawnSync1.stdout)
  const spawnSync2 = spawnSync('python', ['xiaobaods_e.py', "{'attribute':'" + data[0] + "','variable': 'all'}"], {
    cwd: './server/python'
  })
  const data1 = JSON.parse(spawnSync2.stdout)
  res.send({
    data: data,
    data1: data1
  })
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
      else console.log('录入完成')
      res.send(data)
    })
  })
})
router.get('/weekreport', (req, res) => {
  pool.query('SELECT * FROM weekly_publication ORDER BY id DESC LIMIT 0,1;', function (err, result) {
    if (err) throw (err)
    fileSystem.readFile('./server/markdown/' + result[0].name, function (err, data) {
      if (err) throw (err)
      res.send(data)
    })
  })
})
router.post('/qiniu/image', upload.single('image'), (req, res) => {
  // var information = qiniu.uploadImage(req.file.originalname, req.file.buffer.toString())
  console.log(req.file)
})
router.post('/weekreport/editor', (req, res) => {
  var data = req.body
  res.send(data)
})
router.get('/tool-box', (req, res) => {
  console.log(req.query)
  let product = req.query.name === 'betatest' ? req.query.product : ''

  pool.query('SELECT * FROM `Tools_conversion` WHERE `category` = ?', [product], function (err, results, fields) {
    if (err) throw err
    else {
      res.send(results[0])
    }
  })
})
module.exports = router
