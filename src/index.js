const express = require('express');
require('./db/mongoose');  //bcz this is using userRouter and taskRouter
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const path = require('path');
const hbs = require('hbs')

const app = express();
const port = process.env.PORT || 3000;


// Without MiddleWare: new request -> run route handler
// With Middleware: new request -> do something -> run route handler
// ***how to create our own middleware***
// app.use((req, res, next) => {
//     console.log(req.method, req.path);
//     if(req.method === 'GET')
//         return res.send('GET requests are disabled');
//     next();
// })

// ***Middleware example***
// app.use((req, res, next) => {
//     if(req.method) 
//         return res.status(503).send('Under Maintainance..');
// })


// ***Multer example***
// const multer = require('multer');
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb){
//         // if(!file.originalname.endsWith('.pdf')){
//         //     return cb(new Error('Please upload a PDF'))
//         // }

//         //using regular expression
//         if(!file.originalname.match(/\.(doc|docx)$/)){
//             return cb(new Error('Please upload a word document'))
//         }
//         cb(undefined, true);
//         // cb(new Error('file must be a PDF'));
//         // cb(undefined, true);
//         // cb(undefined, false);
//     }
// });

// app.post('/upload', upload.single('uploadName'), (req,res) => {
//     console.log(req.file);
//     res.send();
// }, (error, req, res, next) => {
//     res.status(400).send({error: error.message})
// })


//express will convert the incoming request data from json to javascript object
app.use(express.json());
// Register 'router' with express
app.use(userRouter);
app.use(taskRouter);

//by default expres sets the STATUS CODE as 200(OK)

app.listen(port, () => {
    console.log('Server is up on port: ' + port);
})

// const bcrypt = require('bcrypt');

// const myfunc = async () => {
//     const password = 'yash@1234';
//     const hashedPassword = await bcrypt.hash(password, 8);

//     console.log(password);
//     console.log(hashedPassword);

//     const isMatch = await bcrypt.compare('yash#1234', hashedPassword);
//     console.log(isMatch);
// }

// myfunc();


// const jwt = require('jsonwebtoken');

// const myfunc = async () => {
//     const token = jwt.sign({_id:'dummyID'}, 'randomcharacters', {expiresIn: '1 minute'});
//     // console.log(token);

//     const data = jwt.verify(token, 'randomcharacters');
//     console.log(data);
// }

// myfunc();

// const Task = require('./models/task');
// const User = require('./models/user')

// const main = async () => {
//     // const task = await Task.findById('61d984e25d328e2f41f6f730');
//     // await task.populate('owner');
//     // console.log(task.owner);

//     const user = await User.findById('61d984bd5d328e2f41f6f72a');
//     await user.populate('tasks');
//     console.log(user.tasks);
// }

// main();

