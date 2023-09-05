import express from "express";

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
    }
}

export default new App().express;
