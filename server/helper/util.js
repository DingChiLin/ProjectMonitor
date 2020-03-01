require('dotenv').config();

const crypto = require('crypto');
const path = require('path');
const port = process.env.PORT;
const multer  = require('multer');

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
           cb(null, path.join(__dirname, '../../public/images'));
        },
        filename: (req, file, cb) => {
            const customFileName = crypto.randomBytes(18).toString('hex');
            const fileExtension = file.mimetype.split('/')[1]; // get file extension from original file name
            cb(null, customFileName + '.' + fileExtension);
        }
    })
})

const getImagePath = (req) => {
    if (req.hostname == 'localhost') {
        return req.protocol + '://' + req.hostname + ':' + port + '/'
    } else {
        return req.protocol + '://' + req.hostname + '/'
    }
}

module.exports = {
    upload,
    getImagePath
}