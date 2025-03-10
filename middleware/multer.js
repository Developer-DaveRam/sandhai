import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/products');
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname);
        const uniqueFilename =  Math.round(Math.random() * 1E9) + fileExtension;
        cb(null, uniqueFilename);
    }
});


const avatharStorage = multer.diskStorage({
    destination :(req,file,cb) =>{
        cb(null,'./uploads/avathar');
    },
    filename :(req,file,cb) =>{
        const fileExtension = path.extname(file.originalname);
        const uniqueFilename =  Math.round(Math.random() * 1E9) + fileExtension;
        cb(null, uniqueFilename);
    }
})

const categoryStorage = multer.diskStorage({
    destination :(req,file,cb) =>{
        cb(null,'./uploads/category');
    },
    filename:(req,file,cb) =>{
        const fileExtension = path.extname(file.originalname);
        const uniqueFilename = Math.round(Math.random()* 1E9) + fileExtension
        cb(null,uniqueFilename)
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif','image/svg+xml'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and SVG images are allowed.'), false);
    }
};

export const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 30 * 1024 * 1024 // 5MB file size limit
    }
});

export const category = multer({
    storage:categoryStorage,
    fileFilter : fileFilter,
    limits:{
        fieldSize : 5 * 1024 * 1024
    }

})

export const avathar = multer({
    storage : avatharStorage,
    fileFilter :fileFilter,
    limits:{
        fileSize : 5 *1024 * 1024
    }
})

// export default upload;
