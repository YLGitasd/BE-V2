import axios from 'axios'

export const fetch = function (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, params)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export const Forma = function (timeStamp, formatStr) {
  var str = formatStr
  var _this = new Date(timeStamp)
  var Week = ['日', '一', '二', '三', '四', '五', '六']
  str = str.replace(/yyyy|YYYY/, _this.getFullYear())
  str = str.replace(/yy|YY/, (_this.getYear() % 100) > 9 ? (_this.getYear() % 100).toString() : '0' + (_this.getYear() % 100))
  str = str.replace(/MM/, (_this.getMonth() + 1) > 9 ? (_this.getMonth() + 1).toString() : '0' + (_this.getMonth() + 1))
  str = str.replace(/M/g, (_this.getMonth() + 1))
  str = str.replace(/w|W/g, Week[_this.getDay()])
  str = str.replace(/dd|DD/, _this.getDate() > 9 ? _this.getDate().toString() : '0' + _this.getDate())
  str = str.replace(/d|D/g, _this.getDate())
  str = str.replace(/hh|HH/, _this.getHours() > 9 ? _this.getHours().toString() : '0' + _this.getHours())
  str = str.replace(/h|H/g, _this.getHours())
  str = str.replace(/mm/, _this.getMinutes() > 9 ? _this.getMinutes().toString() : '0' + _this.getMinutes())
  str = str.replace(/m/g, _this.getMinutes())
  str = str.replace(/ss|SS/, _this.getSeconds() > 9 ? _this.getSeconds().toString() : '0' + _this.getSeconds())
  str = str.replace(/s|S/g, _this.getSeconds())
  return str
}

export default {
    /**
     * 获取默认商品列表，parms包含table后台的表名，
     */
  getProductList (params) {
    return fetch('/product', params)
  },
  getWorldList (params) {
    return fetch('/world', params)
  },
  getPropertyList (params) {
    return fetch('/property', params)
  },
  getOptionList (params) {
    return fetch('/world/attribute.json', params)
  },
  formaterDate (timeStamp, formatStr) {
    return Forma(timeStamp, formatStr)
  },
  formatReaponse (commit, commitName, response) {
      /* commit为callback函数,commitName为触发的函数名，response为要处理的数据
        *slice方法将图片切换为大图 、以及去除信息末尾价格
        */
    let [body, title, total] = [[], [], 0]
    if (response) {
      for (let j in response) {
        for (let k in response[j]) {
          k !== 'total' ? title.push(k) : total = response[j][k]
        }
        break
      }
      for (let item in response) {
        if (response[item].主图缩略图) {
          response[item].主图缩略图 = response[item].主图缩略图.slice(0, -10)
          response[item].商品信息 = response[item].商品信息.slice(0, -7)
        }
        body.push(response[item])
      }
      commit(commitName, {title: title, body: body, total: total})
    }
  }
}
