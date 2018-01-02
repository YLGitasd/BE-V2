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
  getOptionList (params) {
    return fetch('/world/attribute.json', params)
  },
  formaterDate (timeStamp, formatStr) {
    return Forma(timeStamp, formatStr)
  }
}
