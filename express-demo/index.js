//we define new routes by calling app.get without using if statements
const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

//Handling Get Requests
app.get('/', (req, res) => {
  res.send("Hello World!!");
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});


//we use route params(year/month) for essential/required values
//we use query strings(?sortByname=dayo) for anything optional
//PORT: an env variable is basically an env that is part of an env in which a process works

//Handling POST Requets
app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

//Handling PUT Requests(for updating our data)
app.put('/api/courses/:id', (req, res) => {
  //Lookup for course
  //if not existing,return 404
  const course = courses.find((cur) => cur.id === parseInt(req.params.id));
  if (!course) return  res.status(404).send("The course with the given ID was not found.");

  //Validate
  //if invalid,return 400- bad request
  const { error } = validateCourse(req.body);
  if (error)  return res.status(400).send(error.details[0].message);
    
  //update
  //Return updated course
  course.name = req.body.name;
  res.send(course);
});

//to call http services,we use a service called postman


//Handling DELETE Requests
app.delete('/api/courses/:id',(req,res)=>{
    const course = courses.find((cur) => cur.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The course with the given ID was not found.");
    
    //Delete
    const index= courses.indexOf(course);
    courses.splice(index,1)
    //return deleted course
    res.send(course)
    })

    app.get('/api/courses/:id', (req, res) => {
    const course = courses.find((cur) => cur.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The course with the given ID was not found.");
        res.send(course);
      });

    function validateCourse(course) {
        const schema = { name: Joi.string().min(3).required() }; //to define d shape of our obj
        return Joi.validate(course,schema); 
      }
      
      const port = process.env.PORT || 3000;
      app.listen(port, () => console.log(`Listening on port ${port}...`));



