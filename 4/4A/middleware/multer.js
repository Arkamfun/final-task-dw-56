const multer = require("multer");

const uploads = multer({ 
    storage: multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/upload/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    },
})
})

module.exports = uploads;