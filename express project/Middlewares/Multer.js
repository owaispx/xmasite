const multer = require("multer");

const upload = multer ({ dest:`/uploads`, limits:{
    fieldSize :1024 * 1024 * 5 ,
},

})

const multermid = upload.single("image");

module.exports = multermid