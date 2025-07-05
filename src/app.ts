import express, { Request, Response } from "express";
const app = express();

const courses = [
    {id:1,name:'course1'},
    {id:2,name:'course2'},
    {id:3,name:'course3'}
]

app.get('/', (req: Request, res: Response) => {
    res.send("hello worldd");
});

app.get('/api/courses',(req:Request,res:Response)=>{
    res.send(courses);
})

app.get('/api/courses/:id',(req:Request,res:Response)=>{
    const course=courses.find(c=>c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with given id was not found');

    res.send(course)
})


export default app;

