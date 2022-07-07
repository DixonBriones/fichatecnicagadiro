const multer= require('multer')
const { DIR_STORAGE } = require('../config')
const fs =require('fs') 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      fs.mkdirSync(DIR_STORAGE, { recursive: true })
      cb(null, DIR_STORAGE)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${file.fieldname}-${uniqueSuffix}.png`)
    }
  })
  
  const upload = multer({ storage: storage })

  module.exports= upload
