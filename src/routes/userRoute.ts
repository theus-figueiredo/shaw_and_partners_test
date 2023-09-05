import { Router } from 'express';
import multer from 'multer';
import userController from '../controller/userController';

const storage = multer.memoryStorage();
const upload = multer({storage: storage}).single('file'); 

const router = Router();

router.post('/',  upload, userController.readCsvFile);

export default router;