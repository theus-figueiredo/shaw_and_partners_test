import { Request, Response } from 'express';
import userData from '../data/userData';
import csvParser from 'csv-parser';

class UserController {


    public readCsvFile(req: Request, res: Response): Response {
        try {
            const { file } = req.body;
            console.log(req.body);
            console.log(file);

            if(!file) {
                return res.status(400).json({message: "file not found"});
            }
    
            const stream = csvParser();
    
            stream.on('data', (row) => {
                userData.push(row);
            })
    
            return res.status(201).json({data: userData});
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }
}

export default new UserController();
