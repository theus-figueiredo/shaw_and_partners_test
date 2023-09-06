import * as chai from 'chai';
import app from '../src/app/app';
import supertest from 'supertest';

const request = supertest(app);

describe('Search the data from the CSV file for matches to the string informed on query param', () => {
    it('Should  return specific results when searching for "bask"', async () => {
        const query = 'bask';

        const response = await request
            .get(`/api/users?q=${query}`);

        chai.expect(response.status).to.be.equal(200);
        chai.expect(response.body).to.have.property('data');

        const expectedResponseData = {
            data: [
            {
                name: 'John Doe',
                city: 'New York',
                country: 'USA',
                favorite_sport: 'Basketball',
            },
            {
                name: 'Emma Wilson',
                city: 'Berlin',
                country: 'Germany',
                favorite_sport: 'Basketball',
            }
        ]};

        chai.expect(response.body).to.deep.equal(expectedResponseData);
    });


    it('Should handle error when invalid query is provided', async () => {
        const query = 'asufdhae';

        const response = await request
            .get(`/api/users?q=${query}`);
        
        chai.expect(response.status).to.equal(404);
        chai.expect(response.body).to.have.property('message').eql('no matches found for the searched parameter');
    });
});
