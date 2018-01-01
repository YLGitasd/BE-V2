const qiniu = require('qiniu')
// // filename参数表示 上传到七牛的文件名，bodyString 文件字符串
// module.exports.uploadImage = function (filename, bodyString) {
//   // 需要填写你的 Access Key 和 Secret Key
//   var accessKey = 'lSAXtH_e1eGFsqLgTdAN7TNpxZ9--4Pn9mb_f_ch'
//   var secretKey = 'GxAgvJTxUh7odlpRjQvKUX3Amr7IWXjVeYY3_X2S'
//   var mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
//   // 要上传的空间
//   var bucket = 'image'
var options = {
  scope: 'bucket',
  callbackBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
  callbackBodyType: 'application/json'
}
var putPolicy = new qiniu.rs.PutPolicy(options)
//   var uploadToken = putPolicy.uploadToken(mac)

//   var config = new qiniu.conf.Config()
//   // 是否使用https域名
//   // config.useHttpsDomain = true
//   // 上传是否使用cdn加速
//   // config.useCdnDomain = true

//   var formUploader = new qiniu.form_up.FormUploader(config)
//   // putExtra 上传文件的额外信息
//   var putExtra = new qiniu.form_up.PutExtra()
//   // 文件上传
//   return formUploader.put(uploadToken, filename, bodyString, putExtra, function (respErr, respBody, respInfo) {
//     if (respErr) {
//       throw respErr
//     }
//     if (respInfo.statusCode === 200) {
//       return respBody
//     } else {
//       return respInfo.statusCode
//     }
//   })
// }
console.log(putPolicy.getFlags())
