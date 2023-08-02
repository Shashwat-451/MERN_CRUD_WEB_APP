const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const UserModel=require('./models/Users')
const app=express()
app.use(cors())
app.use(express.json())

/* Express is a Node.js web application framework. 
It is one of the most popular and widely used frameworks for building web applications and APIs using Node.js.

In the code const app = express(), express() is a function that creates an instance of an Express application
It provides various methods like app.post, app.put, app.get to perform CRUD operation

*/

//Mongoose is a library for Node JS to work with databases
//It provides methods to connecto databases and perform CRUD operation


// By calling app.use(cors()), you're enabling CORS 
// for all origins. This means any frontend application (like your React app) running on any domain will be allowed to make requests to your server.

// CORS-> CROSS ORIGIN RESOURCE SHARING
// In simple terms, CORS allows web servers to specify which origins (domains) are allowed to access 
// their resources. When a web page hosted on one domain makes a request to a server hosted on a different domain (cross-origin request), 
// the browser enforces CORS by sending a pre-flight request to the server to check 
// if the server allows such cross-origin requests. The server responds with specific headers that indicate whether the request is allowed or not.


mongoose.connect("mongodb+srv://mishrashashwat985:MERN_CRUD_PASSWORD45@cluster0.xqbyaa3.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.error("Error connecting to database", error);
  });


  app.get('/',(req,res)=>{
     UserModel.find({})
     .then(users=>res.json(users))
     .catch(err=>res.json(err))
  })


  app.get('/getUser/:id',(req,res)=>{
    const {id}=req.params.id;
    UserModel.findById({_id:id})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
  })

  app.put('/updateUser/:id',(req,res)=>{
    const id=req.params.id;
    UserModel.findByIdAndUpdate({_id:id},
      {name:req.body.name,
      email:req.body.email,
      age:req.body.age})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
  })

  app.delete('/deleteUser/:id',(req,res)=>{
    const id=req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(res=>res.json(res))
    .catch(err=>res.json(err))
  })
  

  app.post('/createUser',(req,res)=>{
        UserModel.create(req.body)
        .then(users =>res.json(users))
        .catch(err=>res.status(400).json('Error'+err))
    })

  app.listen(3001,()=>{
    console.log('server is running')
})


