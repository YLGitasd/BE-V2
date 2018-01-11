const qiniu = require('qiniu')
const path = require('path')
const fileSystem = require('fs')
// filename参数表示 上传到七牛的文件名，bodyString 文件字符串
module.exports.uploadImgFile = function (key,localFile,callback) {
  // 需要填写你的 Access Key 和 Secret Key
  var accessKey = 'lSAXtH_e1eGFsqLgTdAN7TNpxZ9--4Pn9mb_f_ch'
  var secretKey = 'GxAgvJTxUh7odlpRjQvKUX3Amr7IWXjVeYY3_X2S'
  var mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
  // 要上传的空间
  var bucket = 'image'
  var options = {
    scope: bucket,
    callbackBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
    callbackBodyType: 'application/json'
  }
  var putPolicy = new qiniu.rs.PutPolicy(options);

  var uploadToken = putPolicy.uploadToken(mac);
  var config = new qiniu.conf.Config();
  //config.zone = qiniu.zone.Zone_z0;
  var formUploader = new qiniu.form_up.FormUploader(config);
  var putExtra = new qiniu.form_up.PutExtra();



  //file
  formUploader.putFile(uploadToken, key, localFile, putExtra, callback);
}

module.exports.uploadMdFile = function (key,string,callback) {
  // 需要填写你的 Access Key 和 Secret Key
  var accessKey = 'lSAXtH_e1eGFsqLgTdAN7TNpxZ9--4Pn9mb_f_ch'
  var secretKey = 'GxAgvJTxUh7odlpRjQvKUX3Amr7IWXjVeYY3_X2S'
  var mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
  // 要上传的空间
  var bucket = 'text'
  var options = {
    scope: bucket,
    callbackBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
    callbackBodyType: 'application/json'
  }
  var putPolicy = new qiniu.rs.PutPolicy(options);

  var uploadToken = putPolicy.uploadToken(mac);
  var config = new qiniu.conf.Config();
  //config.zone = qiniu.zone.Zone_z0;
  var formUploader = new qiniu.form_up.FormUploader(config);

  //file
  formUploader.put(uploadToken, key, string, null, callback);
  
}


module.exports.downloadMdFile = function (urlsToPrefetch,callback){
  var accessKey = 'lSAXtH_e1eGFsqLgTdAN7TNpxZ9--4Pn9mb_f_ch'
  var secretKey = 'GxAgvJTxUh7odlpRjQvKUX3Amr7IWXjVeYY3_X2S'
  var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  var cdnManager = new qiniu.cdn.CdnManager(mac);
  cdnManager.prefetchUrls(urlsToPrefetch, callback);
}
