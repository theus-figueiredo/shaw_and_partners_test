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
        this.express.use('/api', userRouter);
    }
}

export default new App().express;
