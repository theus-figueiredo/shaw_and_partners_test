import * as chai from 'chai';
import app from '../src/app/app';
import supertest from 'supertest';

const request = supertest(app);

describe('CSV file upload test', () => {

    it('Should upload a CSV file and return a success message', async () => {
        const filePath = 'tests/testFile/file.csv';

        const response = await request
            .post('/api/files')
            .attach('file', filePath)

        
        chai.expect(response.status).to.equal(201);
        chai.expect(response.body).to.have.property('data').eql('Data imported');
    });

    it('Should handle and error when no file is attatched', async () => {

        const response = await request
            .post('/api/files')
        
        chai.expect(response.status).to.equal(400);
        chai.expect(response.body).to.have.property('message').eql('File not found');
    });
});
