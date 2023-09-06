import { Router } from 'express';
import multer from 'multer';
import userController from '../controller/userController';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({dest: 'uploads/', storage: storage}).single('file'); 

const router = Router();

router.post('/',  upload, userController.readCsvFile);

export default router;