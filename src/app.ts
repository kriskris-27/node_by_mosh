import express, { Request, Response } from "express";
const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send("hello worldd");
});

app.get('/api/courses',(req:Request,res:Response)=>{
    res.send([1,2,3]);
})

app.get('/api/courses/:id',(req:Request,res:Response)=>{
    res.send(req.params.id)
})

app.get('/api/posts/:year/:month',(req:Request,res:Response)=>{
    res.send(req.query)
})
export default app;

