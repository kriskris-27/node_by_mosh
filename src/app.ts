import Joi from "joi";
import express, { Request, Response } from "express";
const app = express();

app.use(express.json())
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

app.put('/api/courses/:id', (req: Request, res: Response) => {
    // lookup
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given ID was not found');
        return;
    }

    // validate
    const { error } = validateCourse(req.body)
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // update course
    course.name = req.body.name;
    res.send(course);
})

function validateCourse(course:any){
const schema = Joi.object({
        name:Joi.string().min(3).required()
    })
        return   schema.validate(course)
        
}

app.delete('/api/courses/:id',(req:Request , res:Response)=>{
    const course = courses.find(c => c.id ===parseInt(req.params.id))
    if(!course) {
        res.status(404).send('The course with the given ID was not found');
        return;
    }
       
    const index=courses.indexOf(course);
    courses.splice(index,1);

    res.send(course)
     
})
app.post('/api/courses',(req:Request,res:Response)=>{
    
    const { error } = validateCourse(req.body)
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    
    const course= {
        id:courses.length+1,
        name:req.body.name
    };
    courses.push(course);
    res.send(course);
})


// localStorage.setItem('name','bob')

export default app;

