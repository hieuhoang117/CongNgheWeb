import { Request, Response } from 'express';
import express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
  });

app.get('/TinhTong/:id', (req: Request, res: Response) => {
    const n = +req.params.id;
    var s: number = 0;
    for (let i = 1; i <= n; ++i)
        s += i;
    res.send('Tổng là:' + s);
});

app.post('/TinhTongHaiSo', (req: Request, res: Response) => {
    const obj = req.body as {a:any,b:any};  
   var s: number = Number(obj.a) + Number(obj.b);    
   res.send('Tổng là:' + s);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});