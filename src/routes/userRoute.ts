import { Router } from 'express';
import multer from 'multer';
import userController from '../controller/userController';
import fs from 'fs';
import path from 'path';

const uploadFolder = 'uploads/';

if(!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const originalName = file.originalname;
        const extension = path.extname(originalName);

        const uniqueFileName = `${timestamp}${extension}`

        cb(null, uniqueFileName);
    }
});

const upload = multer({dest: 'uploads/', storage: storage}).single('file'); 

const router = Router();

router.post('/files',  upload, userController.readCsvFile);
router.get('/users', userController.getData);

export default router;
