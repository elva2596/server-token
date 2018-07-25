const qiniu  = require('qiniu');
const path = require("path")
const fs = require('fs');
const config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z0;
const formUploader = new qiniu.form_up.FormUploader(config);
const putExtra = new qiniu.form_up.PutExtra();
const bucketHost = process.env.BUCKET_HOST
const axios = require('axios')



// 创建token
const createToken = ()=>{
  const mac = new qiniu.auth.digest.Mac(process.env.ACCESS_KEY,process.env.SECRET_KEY)
  const ops = {
    scope:process.env.BUCKET,
    returnBody:'{"key": $(key), "hash": $(etag), "w": $(imageInfo.width), "h": $(imageInfo.height)}',
    persistentOps:'imageMogr2/thumbnail/!20p/format/jpg/blur/1x0/quality/75|imageslim'
  }
  return  new qiniu.rs.PutPolicy(ops).uploadToken(mac)
}

const upload = (baseDir,filePath,fileName)=>{
  const token = createToken()
  // 以当前时间戳+0-10000的任意整数的16进制字符串为上传的图片重命名
  const imgName = (Date.now()+Math.ceil(Math.random()*10000)).toString(16)
  // 返回指定文件的扩展名
  const extName = path.extname(fileName)
  const newFileName = imgName+extName
  const repath = `${baseDir}/${newFileName}`
  // 封装成promise
  return new Promise((resolve,rejected)=>{
    fs.rename(filePath,repath,function (){
      formUploader.putFile(token, newFileName, repath, putExtra, function(err, ret) {
        // console.log(res)
            if(!err) {
              // console.log(ret)
              // url存到数据库中
              const imgUrl = `${bucketHost}/${ret.key}`
              fs.unlink(repath)
              /**
               * 并发get请求获取缩略图的信息,
               * works:
               * pub:
               * exh:
               */
               // axios.get(`${imgUrl}-${styleName}?imageInfo`)
               //        .then((res)=>{
               //          console.log(res)
               //
               //        })
              // console.log(imgUrl)
                resolve(imgUrl)
            } else {
            rejcted(err)
            }
          });
    })
  })
}
module.exports = upload
