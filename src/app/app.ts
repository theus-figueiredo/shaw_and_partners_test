import express from "express";
import userRouter from '../routes/userRoute';

class App {

    public express: express.Application;

    public constructor() {
        this.express = express();
        this.middlewares();
        this.routes();
    }

    public middlewares() {
        this.express.use(express.json());
    }

    public routes() {
        this.express.get('/', (_req, res) => res.send(`Hello there!!`));
        this.express.use('/api/files', userRouter);
    }
}

export default new App().express;
