import { Request, Response } from 'express';
import express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello Web API");
});

app.listen(port, () => {
    console.log("Server running at http://localhost:" + port);
});
import { Layout } from 'antd';
