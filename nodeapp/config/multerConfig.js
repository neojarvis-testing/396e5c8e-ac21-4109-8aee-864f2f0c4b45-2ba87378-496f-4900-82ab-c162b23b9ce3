const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'uploads/')
    },
    filename: (req,file,cb) => {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
        cb(null,uniqueSuffix + '_' + file.originalname);
    }
})
const fileFilter = (req,file,cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|docx|xlxs/
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if(extName && mimetype){
        cb(null,true);
    }
    else{
        cb(new Error('Only allowed images,pdf, docs and xlxs type'),false)
    }
}



module.exports = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter
});