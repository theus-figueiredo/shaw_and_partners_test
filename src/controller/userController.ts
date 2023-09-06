import { Request, Response } from 'express';
import csvParser from 'csv-parser';
import fs from 'fs';

class UserController {

    public readCsvFile(req: Request, res: Response): Response {
        try {
          const file = req.file;
    
          if (!file) {
            return res.status(400).json({ message: 'File not found' });
          }
    
          const uniqueData: any[] = [];
          const stream = csvParser();
    
          stream.on('data', (row) => {
            const isDuplicate = uniqueData.some((data) => {
              return (
                data.name === row.name &&
                data.city === row.city &&
                data.country === row.country &&
                data.favorite_sport === row.favorite_sport
              );
            });
    
            if (!isDuplicate) {
              uniqueData.push({
                name: row.name,
                city: row.city,
                country: row.country,
                favorite_sport: row.favorite_sport,
              });
            }
          });
    
          stream.on('end', () => {
            const jsonFilePath = './src/data/output.json';
            const jsonData = JSON.stringify(uniqueData, null, 2);
    
            fs.writeFileSync(jsonFilePath, jsonData, 'utf-8');
            console.log('Data saved to output.json');
          });
    
          stream.on('end', () => {
            res.status(201).json({ data: 'Data imported' });
          });
    
          fs.createReadStream(file.path).pipe(stream);
        } catch (error) {
          return res.status(400).json({ error: error.message });
        }
      }



    public getData(req: Request, res: Response): Response {
        try {
            
            

        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }
}

export default new UserController();
