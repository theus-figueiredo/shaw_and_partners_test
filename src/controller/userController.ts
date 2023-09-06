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
            
            const query = req.query.q 

            if(!query) {
                return res.status(400).json({ message: 'missing query parameter for search' });
            }

            const jsonFilePath = './src/data/output.json';

            fs.readFile(jsonFilePath, 'utf-8', (error, data) => {
                if(error) return res.status(500).json({ error: 'JSON file could not be read' });

                const jsonData = JSON.parse(data);

                const results = jsonData.filter((item) => {
                    const valuesForSearch = Object.values(item).map((value) => value.toString().toLowerCase());
                    return valuesForSearch.some((value) => value.includes(query.toString().toLowerCase()));
                });

                if(results.length == 0) {
                  return res.status(404).json({message: 'no matches found for the searched parameter'});
                }

                return res.status(200).json({data: results});
            });


        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }
}

export default new UserController();
