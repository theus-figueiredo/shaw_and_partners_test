import { Router } from 'express';
import multer from 'multer';
import userController from '../controller/userController';

const storage = multer.memoryStorage();
const upload = multer({dest: 'uploads/'}).single('file'); 

const router = Router();

router.post('/',  upload, userController.readCsvFile);

export default router;