
# Shaw and Partners backend test


The application was built for the test to the Jr Backend developer position at Shaw and Partners.
## Features

- Upload a CSV file
- Search through the CSV file data



## Installation

Install the project with npm

clone the repository

```bash
git clone git@github.com:theus-figueiredo/shaw_and_partners_test.git
cd shaw_and_partners_test
```

install dependecies
```bash
npm install
```

run the application
```bash
npm run dev
```



## API Endpoints

#### upload CSV file

```http
  POST /api/files
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `file`    | `file`   | **Required** Your CSV file |

#### Search data inside the CSV file

```http
  GET /api/users?q=${param}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `query`   | `string` | **Required**. String to Search    |


## Running Tests

To run tests, run the following command

```bash
  npm run test
```

